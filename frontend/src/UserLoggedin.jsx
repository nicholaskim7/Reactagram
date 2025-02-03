import React, { useRef } from 'react'
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


  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

 
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const fileInputRef = useRef(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
        formData.append('images', image); 
    });
    formData.append('description', text);
    formData.append('userID', id)

    axios.post('http://localhost:8012/upload', formData)
        .then(response => {
            console.log(response.data);
            fetchPosts();
            // Clear the form fields
            setImages([]);
            setText('');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
        })
        .catch(error => {
            console.error(error);
        });
  };


  // Function to fetch posts
  const fetchPosts = () => {
    axios.get(`http://localhost:8012/posts/${id}`)
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => console.error('Error fetching posts:', error));
  };


  const handleDelete = (photoId) => {
    console.log(`Deleting post with id: ${photoId}`); // Debugging log
    axios.delete(`http://localhost:8012/user/${id}/photo/${photoId}`)
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
    axios.get(`http://localhost:8012/user/${id}`)
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
    axios.get(`http://localhost:8012/user/${id}/logout`)
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
          {/* <h3>You are Authorized --- {id}</h3> */}
          <div className='mt-2 fixed-top'>
            <DropdownButton id="dropdown-basic-button" title="Settings" className="custom-dropdown-button" style={{ position: 'absolute', top: '70px', right: '20px' }}>
              <Dropdown.Item as={Link} to={`/loggedin/updatelogin/${id}`} className='text-primary'>Update Login</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/loggedin/updateprofile/${id}`} className='text-primary'>Update Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} className='text-danger'>Logout</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className='w-50 rounded p-3 custom-box' style={{ marginTop: '90px' }}>
              <h2>@{user.username}</h2>
              {user.profile_picture && <img src={`http://localhost:8012${user.profile_picture}`} alt="Profile" width="160" height="160" className='mb-3' style={{ borderRadius: '50%', objectFit: 'cover'}} />}
              <div className='mb-2'>
                <strong>Name:</strong> {user.full_name}
              </div>
              <div className='mb-2'>
                <strong>Bio:</strong> {user.bio}
              </div>
              <div className='mb-2'>
                <strong>Relationship Status:</strong> {user.relationship}
              </div>

                <div className='mb-2'>
                  <Link 
                    to={`/followers/${id}`} 
                    state={{ loggedInUserId: id }} 
                    className='btn btn-primary welcome-btn'
                    style={{ marginRight: '10px' }} // Adjust the value as needed
                  >
                    View Followers
                  </Link>
                  <Link 
                    to={`/following/${id}`} 
                    state={{ loggedInUserId: id }} 
                    className='btn btn-primary welcome-btn'
                  >
                    View Following
                  </Link>
              </div>
            </div>
        
            <div className='mt-4 w-50 rounded p-3 custom-box'>
              <div className="mb-3 upload-form p-3 rounded shadow-sm bg-white">
                  <strong>Upload pictures:</strong>
                  <form onSubmit={handleSubmit} className="d-flex flex-column w-100 gap-2">
                      <input 
                          type="file" 
                          multiple 
                          onChange={handleImageChange} 
                          ref={fileInputRef} 
                          className="form-control"
                      />
                      <textarea
                          placeholder="Enter description"
                          value={text}
                          onChange={handleTextChange}
                          className="form-control"
                          rows="3"
                      />
                      <button type="submit" className="btn btn-primary">Upload</button>
                  </form>
              </div>
              <div className="mb-2">
                <strong>Your Feed:</strong>
                    {posts.map(post => (
                        <div key={post.ID} className="post mt-2">
                            <h3>{post.Text}</h3>
                            {JSON.parse(post.Images).map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8012${imageUrl}`}
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
        <div className="bg-light-blue mt-4">
          <h3 className="mt-4">{messages}</h3>
          <h3 className="mt-4 mb-4" >Please login now</h3>
          <Link to="/login" className='custom-dropdown-button'>Login</Link>
        </div>
      }
    </div>
  );
}

export default UserLoggedin
