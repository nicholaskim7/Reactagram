import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';

function FollowingList() {
  const { id } = useParams();
  const { state } = useLocation();
  const [following, setFollowing] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(state?.loggedInUserId || null);
  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    // Fetch the list of users the current user is following
    axios.get(`http://localhost:8081/following/${id}`)
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

    // Fetch the list of users that the logged-in user is following
    if (loggedInUserId) {
      axios.get(`http://localhost:8081/following/${loggedInUserId}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setUserFollowing(res.data);
          } else {
            setUserFollowing([]);
            console.error("Expected an array but got:", res.data);
          }
        })
        .catch(err => {
          console.error('Error fetching following:', err.response ? err.response.data : err.message);
          setUserFollowing([]);
        });
    }
  }, [id, loggedInUserId]);

  const isFollowing = (userId) => {
    return userFollowing.some(user => user.user_id === userId);
  };

  return (
    <div className="d-flex vh-100 justify-content-center bg-light-blue">
      <h2>Following</h2>

      <div className='mt-5 w-50 rounded p-3 custom-box'>
        <ul>
          {following.length > 0 ? (
            following.map(follow => (
              <li key={follow.user_id} className="post">
                <Link to={`/publicprofile/${follow.username}`} className="post-link" state={{ loggedInUserId }}>
                  {follow.full_name} (@{follow.username})
                </Link>
                {loggedInUserId && (
                  <span>
                    {isFollowing(follow.user_id) ? ' (Following)' : ' (Not Following)'}
                  </span>
                )}
              </li>
            ))
          ) : (
            <li>No following found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FollowingList;