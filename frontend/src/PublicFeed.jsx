import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'
import './Feed.css'
import { Link, useParams, useLocation } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format if needed
};

function PublicFeed() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('loggedInUserId') || null);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8081/posts');
                if (res.data && Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.log(err);
                setPosts([]);
            }
        };

        const fetchFollowing = async () => {
            if (loggedInUserId) {
                try {
                    const res = await axios.get(`http://localhost:8081/following/${loggedInUserId}`);
                    if (Array.isArray(res.data)) {
                        setFollowing(res.data);
                    } else {
                        setFollowing([]);
                        console.error("Expected an array but got:", res.data);
                    }
                } catch (err) {
                    console.error('Error fetching following:', err.response ? err.response.data : err.message);
                    setFollowing([]);
                }
            }
        };

        fetchPosts();
        fetchFollowing();
    }, [loggedInUserId]);

    const isFollowing = (userId) => {
        return following.some(user => user.user_id === userId);
    };

    return (
        <div>
            <div className='d-flex flex-column align-items-center bg-light-blue'>
                <div className='mt-4 w-50 rounded p-3 custom-box'>
                    <div className="mb-2">
                        {posts.map(post => (
                            <div key={post.ID} className="post">
                                <h5><Link
                                        to={`/publicprofile/${post.username}`}
                                        className="post-link" 
                                        state={{ loggedInUserId }}
                                    >
                                        @{post.username}
                                    </Link>
                                    {loggedInUserId && isFollowing(post.user_id) && (
                                        <span> (Following)</span>
                                    )}
                                </h5>

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
        </div>
    );
}

export default PublicFeed;