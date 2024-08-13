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
  const [isFollowing, setIsFollowing] = useState(state?.isFollowing || false);
  const navigate = useNavigate();
  const loggedInUserId = state?.loggedInUserId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:8081/public/${name}`);
        setUserData(userRes.data.user);
        setPosts(userRes.data.posts);
        
        if (loggedInUserId) {
          const followingRes = await axios.get(`http://localhost:8081/following/${loggedInUserId}`);
          const isFollowingUser = followingRes.data.some(following => following.user_id === userRes.data.user.user_id);
          setIsFollowing(isFollowingUser);
      }
  } catch (err) {
      console.error('Error fetching user data:', err);
  }
};

fetchUserData();
}, [name, loggedInUserId]);


  const handleUnfollow = async () => {
    try {
      await axios.delete('http://localhost:8081/unfollow', {
        data: { user_id: userData.user_id, follower_id: loggedInUserId }
      });
      setIsFollowing(false);
    } catch (err) {
      console.error('Error unfollowing user:', err);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post('http://localhost:8081/follow', {
        user_id: userData.user_id,
        follower_id: loggedInUserId
      });
      setIsFollowing(true);
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

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
        {
          isFollowing ? 
          <button onClick={handleUnfollow} className='btn btn-danger'>Unfollow</button> :
          <button onClick={handleFollow} className='btn btn-primary'>Follow</button>
        }
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
