import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import react, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import './Feed.css';
import './Login.css';
import './UserLoggedin.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust format if needed
};

function UserLoggedin() {
  const [auth, setAuth] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState('')
  axios.defaults.withCredentials = true;


  //handle image change
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  //handle image description change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  //handle image submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
        formData.append('images', image); 
    });
    formData.append('description', text);
    formData.append('userID', id)

    axios.post('http://localhost:8081/upload', formData)
        .then(response => {
            console.log(response.data);
            fetchPosts();
            // Clear the form fields
            setImages([]);
            setText('');
        })
        .catch(error => {
            console.error(error);
        });
  };


  // Function to fetch posts
  const fetchPosts = () => {
    axios.get(`http://localhost:8081/posts/${id}`)
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => console.error('Error fetching posts:', error));
  };


  const handleDelete = (photoId) => {
    console.log(`Deleting post with id: ${photoId}`); // Debugging log
    axios.delete(`http://localhost:8081/user/${id}/photo/${photoId}`)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          setPosts(posts.filter(post => post.ID !== photoId));
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => console.error('Error deleting photo:', error));
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/user/${id}`)
      .then(res => {
        if(res.data.Status === "Success") {
          setUser(res.data.user);
          setAuth(true)
        } else {
          setAuth(false)
          setMessages(res.data.message);
        }
      })
      .catch(err => console.log(err));
    fetchPosts();
  }, [id]);

  

  const handleLogout = () => {
    axios.get(`http://localhost:8081/user/${id}/logout`)
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
    navigate('/login')
  };

  return (
    <div>
      {
        auth ?
        <div className='d-flex flex-column align-items-center bg-light-blue'>
          <h3>You are Authorized --- {id}</h3>
          <div className='mt-4'>
            <DropdownButton id="dropdown-basic-button" title="Settings" variant="dark" style={{ position: 'absolute', top: '10px', right: '20px' }}>
              <Dropdown.Item as={Link} to={`/loggedin/updatelogin/${id}`} className='text-primary'>Update Login</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/loggedin/updateprofile/${id}`} className='text-primary'>Update Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} className='text-danger'>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className='mt-4 w-50 rounded p-3 custom-box'>
              <h2>@{user.username}</h2>
              {user.profile_picture && <img src={`http://localhost:8081${user.profile_picture}`} alt="Profile" width="150" height="140" className='mb-3' style={{ borderRadius: '50%' }} />}
              <div className='mb-2'>
                <strong>Name:</strong> {user.full_name}
              </div>
              <div className='mb-2'>
                <strong>Bio:</strong> {user.bio}
              </div>
              <div className='mb-2'>
                <strong>Relationship Status:</strong> {user.relationship}
              </div>
          </div>
        
            <div className='mt-4 w-50 rounded p-3 custom-box'>
              <div className='mb-2 upload-form'>
                <form onSubmit={handleSubmit}>
                    <input type="file" multiple onChange={handleImageChange} />
                    <textarea
                        placeholder="Enter description"
                        value={text}
                        onChange={handleTextChange}
                    />
                    <button type="submit">Upload</button>
                </form>
              </div>
              <div className="mb-2">
                <strong>Your Feed</strong>
                    {posts.map(post => (
                        <div key={post.ID} className="post">
                            <h3>{post.Text}</h3>
                            {JSON.parse(post.Images).map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8081${imageUrl}`}
                                    alt="Post"
                                    style={{ width: '300px', height: 'auto', margin: '10px' }}
                                />
                            ))}
                            <h6>{formatDate(post.date)}</h6>
                            <button className="delete-button" onClick={() => handleDelete(post.ID)}>Delete</button>
                        </div>
                    ))}
              </div>
            </div>
        </div>
        :
        <div>
          <h3>{messages}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className='btn-primary'>Login</Link>
        </div>
      }
    </div>
  );
}

export default UserLoggedin
