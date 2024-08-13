import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';

function FollowersList() {
  const { id } = useParams();
  const { state } = useLocation();
  const [followers, setFollowers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(state?.loggedInUserId || null);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Fetch followers
    axios.get(`http://localhost:8081/followers/${id}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setFollowers(res.data);
        } else {
          setFollowers([]);
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch(err => {
        console.error('Error fetching followers:', err.response ? err.response.data : err.message);
        setFollowers([]);
      });

    // Fetch following to check the follow status
    if (loggedInUserId) {
      axios.get(`http://localhost:8081/following/${loggedInUserId}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setFollowing(res.data);
          } else {
            setFollowing([]);
            console.error("Expected an array but got:", res.data);
          }
        })
        .catch(err => {
          console.error('Error fetching following:', err.response ? err.response.data : err.message);
          setFollowing([]);
        });
    }
  }, [id, loggedInUserId]);

  const isFollowing = (userId) => {
    return following.some(user => user.user_id === userId);
  };

  return (
    <div className="d-flex vh-100 justify-content-center bg-light-blue">
      <h2>Followers</h2>
      <div className='mt-5 w-50 rounded p-3 custom-box'>
        <ul>
          {followers.length > 0 ? (
            followers.map(follower => (
              <li key={follower.user_id} className="post">
                <Link 
                  to={`/publicprofile/${follower.username}`}
                  className="post-link"
                  state={{ loggedInUserId }}
                >
                  {follower.full_name} (@{follower.username})
                </Link>
                {loggedInUserId && (
                  <span>
                    {isFollowing(follower.user_id) ? ' (Following)' : ' (Not Following)'}
                  </span>
                )}
              </li>
            ))
          ) : (
            <li>No followers found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FollowersList;