const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require("path");
const cookieParser = require("cookie-parser");
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydatabase"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


//storage for profile pic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


//gets users from database
app.get("/", (req,res) =>{
    const sql = "SELECT * FROM userprofile";
    db.query(sql,(err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

//login logic select user whose email and password matches
app.post('/login', (req,res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM usercredentials WHERE email = ?";
    
    db.query(sql, [email], (err, data) => {
        if(err) return res.status(500).json({ message: "Login Error" });
        if(data.length > 0) {
            const hashedPassword = data[0].password;
            console.log(hashedPassword);
            console.log(password);
            bcrypt.compare(password.toString(), hashedPassword, (err, response) => { //compare hashed database password to entered password hashed
                if(err) return res.json({message: "Password compare error"});
                if(response) {
                    const userId = data[0].user_id;
                    const token = jwt.sign({ userId }, "secret_key_123", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({ message: "Login successful...", userId }) 
                }
                else {
                    return res.json({message: "Password not matched"});
                }
            });
        } else {
            return res.status(401).json({ message: "Login Error. Please try again. If you dont have an account please create one." });
        }
    });
});


//creating new users and inserting into the database hashing password
app.post('/create', (req, res) => {
    const { name, email, password } = req.body;
    
    db.beginTransaction((err) => {
        if (err) {
            console.error('Transaction Error:', err);
            return res.json({ message: "Transaction Error" });
        }

        const userProfileSql = "INSERT INTO userprofile (`full_name`) VALUES (?)";  //insert userprofile info
        const userCredentialsSql = "INSERT INTO usercredentials (`user_id`, `email`, `password`) VALUES (?, ?, ?)";  //insert usercredentials

        bcrypt.hash(password.toString(), salt, (err, hash) => {
            if (err) {
                console.error('Hashing Error:', err);
                return res.json({ message: "Error for hashing password" });
            }

            // Insert into userprofile
            db.query(userProfileSql, [name], (err, result) => {
                if (err) {
                    console.error('Error creating user profile:', err);
                    return db.rollback(() => {
                        res.json({ message: "Error creating user profile" });
                    });
                }

                const userId = result.insertId;

                // Insert into usercredentials
                db.query(userCredentialsSql, [userId, email, hash], (err, result) => {
                    if (err) {
                        console.error('Error creating user credentials:', err);
                        return db.rollback(() => {
                            res.json({ message: "Error creating user credentials" });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            console.error('Transaction Commit Error:', err);
                            return db.rollback(() => {
                                res.json({ message: "Transaction Commit Error" });
                            });
                        }
                        res.json({ message: "User created successfully...", userId });
                    });
                });
            });
        });
    });
});


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({ message: "You are not Authorized" });
    } else {
        jwt.verify(token, "secret_key_123", (err, decoded) => {
            if(err) {
                return res.json({ message: "Token is not ok" });
            } else {
                req.userId = decoded.userId;
                next();
            }
        })
    }
}


//once user is logged in they are redirected to there profile page (if we dont need profile pic use one above or remove pic stuff)
app.get('/user/:id', verifyUser, (req, res) => {
    const { id } = req.params;
    const sqlProfile = "SELECT user_id, full_name, username, profile_picture, relationship, bio FROM userprofile WHERE user_id = ?";
    const sqlCredentials = "SELECT email FROM usercredentials WHERE user_id = ?";

    db.query(sqlProfile, [id], (err, profileData) => {
        if (err) return res.status(500).json({ message: "Error fetching profile" });
        if (profileData.length > 0) {
            db.query(sqlCredentials, [id], (err, credentialsData) => {
                if (err) return res.status(500).json({ message: "Error fetching credentials" });
                if (credentialsData.length > 0) {
                    return res.json({ Status: "Success", user: { ...profileData[0], ...credentialsData[0] } });
                } else {
                    return res.status(404).json({ message: "Credentials not found" });
                }
            });
        } else {
            return res.status(404).json({ message: "User profile not found" });
        }
    });
});


app.get('/check-username/:username', (req,res) => {
    const { username } = req.params;
    const sql = "SELECT COUNT(*) AS count FROM userprofile WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({message: "Error checking username"});
        const userExists = result[0].count > 0;
        return res.json({ userExists })
    });
});


//for public profile
app.get('/public/:username', (req, res) => {
    const { username } = req.params;
    const sqlProfile = "SELECT user_id, full_name, username, profile_picture, bio, relationship FROM userprofile WHERE username = ?";

    const postsSql = `
        SELECT p.* 
        FROM post p 
        JOIN userprofile u ON p.user_id = u.user_id 
        WHERE u.username = ?
    `;

    db.query(sqlProfile, [username], (err, userData) => {
        if (err) return res.status(500).json({ message: "Error" });
        if (userData.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = userData[0];
        db.query(postsSql, [username], (err, postResults) => {
            if (err) return res.status(500).json({ message: "Error fetching posts" });

            res.json({ user, posts: postResults });
        });
    });
});



//logic to update user profile info includes profile pic stuff
app.put('/user/:id/update', upload.single('profile_picture'), (req, res) => {
    const { id } = req.params;
    const { bio, relationship, full_name, username } = req.body;
    let profilePic = null;
    if (req.file) {
        profilePic = `/uploads/${req.file.filename}`;
    }

    let sql = "UPDATE userprofile SET full_name = ?, username = ?, bio = ?, relationship = ?";
    let params = [full_name, username, bio, relationship];

    if (profilePic) {
        sql += ", profile_picture = ?";
        params.push(profilePic);
    } 

    sql += " WHERE user_id = ?";
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating user" });
        return res.json({ message: "User updated successfully" });
    });
});


//logic to update user login like email password and name
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    let sql = "UPDATE usercredentials SET email = ?";
    let params = [email];

    if (password) {
        bcrypt.hash(password.toString(), salt, (err, hash) => {
            if (err) return res.status(500).json({ message: "Error hashing password" });

            sql += ", password = ?";
            params.push(hash);

            sql += " WHERE user_id = ?";
            params.push(id);

            db.query(sql, params, (err, result) => {
                if (err) return res.status(500).json({ message: "Error updating user credentials" });
                return res.json({ message: "User credentials updated successfully" });
            });
        });
    } else {
        sql += " WHERE user_id = ?";
        params.push(id);

        db.query(sql, params, (err, result) => {
            if (err) return res.status(500).json({ message: "Error updating user credentials" });
            return res.json({ message: "User credentials updated successfully" });
        });
    }
});


//clear cookies so now when you refresh you will no longer be authenticated. (this fixes bypassing login thru url)
app.get('/user/:id/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: "Success"});
})
        

// photo upload stuff
const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const photoUpload = multer({
    storage: photoStorage
}).array('images', 10); // Ensure it matches 'images'

app.post('/upload', (req, res) => {
    photoUpload(req, res, function (err) {
        if (err) {
            console.error('Error uploading images:', err);
            return res.status(500).json({ message: 'Error uploading images' });
        }

        const { description, userID } = req.body; 
        const imageUrls = req.files.map(file => `/Images/${file.filename}`);

        const sql = 'INSERT INTO post (Text, Images, user_id) VALUES (?, ?, ?)';
        const params = [description, JSON.stringify(imageUrls), userID];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.error('Error saving post to database:', err);
                return res.status(500).json({ message: 'Error saving post to database' });
            }
            res.json({ message: 'Images uploaded successfully' });
        });
    });
});

app.use('/Images', express.static(path.join(__dirname, 'Images')));


// fetch posts
app.get('/posts/:userid', (req, res) => {
    const { userid } = req.params;
    const sql = 'SELECT * FROM post WHERE user_id = ?';
    db.query(sql, [userid], (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ message: 'Error fetching posts' });
        }
        res.json(results);
    });
});


//get all post for "for you page"
app.get('/posts', (req, res) => {
    const sql = `
        SELECT p.*, u.username 
        FROM post p
        JOIN userprofile u ON p.user_id = u.user_id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ message: 'Error fetching posts' });
        }
        res.json(results);
    });
});


app.delete('/user/:id/photo/:photoId', (req, res) => {
    const { id, photoId } = req.params;
    const sql = 'DELETE FROM post WHERE user_id = ? AND ID = ?';

    db.query(sql, [id, photoId], (err, result) => {
        if (err) {
            console.error('Error deleting photo:', err);
            return res.status(500).json({ success: false, message: 'Error deleting photo' });
        }
        res.json({ success: true, message: 'Photo deleted successfully' });
    });
});


//logic to remove user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    
    db.beginTransaction((err) => {
        if (err) {
            console.error('Transaction Error:', err);
            return res.status(500).json({ message: "Transaction Error" });
        }

        const deleteProfileSql = "DELETE FROM userprofile WHERE user_id = ?";
        const deleteCredentialsSql = "DELETE FROM usercredentials WHERE user_id = ?";

        // Delete from userprofile
        db.query(deleteProfileSql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting from userprofile:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: "Error deleting from userprofile" });
                });
            }

            // Delete from usercredentials
            db.query(deleteCredentialsSql, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting from usercredentials:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: "Error deleting from usercredentials" });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        console.error('Transaction Commit Error:', err);
                        return db.rollback(() => {
                            res.status(500).json({ message: "Transaction Commit Error" });
                        });
                    }
                    res.json({ message: "User deleted successfully" });
                });
            });
        });
    });
});


app.listen(8081, () => {
    console.log("listening...");
});
