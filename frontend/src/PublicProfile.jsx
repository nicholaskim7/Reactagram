import React from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import react, { useEffect, useState } from 'react'
import axios from 'axios';
import './Feed.css';
import './Login.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust format if needed
};

function PublicProfile() {
  const { name } = useParams();
  const { state } = useLocation();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const loggedInUserId = state?.loggedInUserId;

  useEffect(() => {
    axios.get(`http://localhost:8081/public/${name}`)
      .then(res => {
        setUserData(res.data.user);
        setPosts(res.data.posts);
      })
      .catch(err => console.log(err));
  }, [name]);

  return (
    <div className='d-flex flex-column align-items-center bg-light-blue'>
      <div className='mt-4 w-50 rounded p-3 custom-box'>
        <h2>@{userData.username}</h2>
        {userData.profile_picture && <img src={`http://localhost:8081${userData.profile_picture}`} alt="Profile" width="150" height="140" className='mb-3' style={{ borderRadius: '50%' }} />}
        <div className='mb-2'>
          <strong>Name:</strong> {userData.full_name}
        </div>
        <div className='mb-2'>
          <strong>Bio:</strong> {userData.bio}
        </div>
        <div className='mb-2'>
          <strong>Relationship Status:</strong> {userData.relationship}
        </div>
      </div>

      <div className='mt-4 w-50 rounded p-3 custom-box'>
        <div className="mb-2">
          <strong>{userData.full_name}'s Feed:</strong>
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.Text}</h3>
              {JSON.parse(post.Images).map((imageUrl, index) => (
                <img
                  key={index}
                  src={`http://localhost:8081${imageUrl}`}
                  alt="Post"
                  style={{ width: '350px', height: 'auto', margin: '10px' }}
                />
              ))}
              <h6>{formatDate(post.date)}</h6>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default PublicProfile
