import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'
import './Feed.css'
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format if needed
};

function PublicFeed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/posts')
            .then(res => {
                if (res.data && Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    setPosts([]);
                }
            })
            .catch(err => {
                console.log(err);
                setPosts([]);
            });
    }, []);

    return (
        <div>
            <div className='d-flex flex-column align-items-center bg-light-blue'>
                <div className='mt-4 w-50 rounded p-3 custom-box'>
                    <div className="mb-2">
                        {posts.map(post => (
                            <div key={post.ID} className="post">
                                <h5><Link to={`/publicprofile/${post.username}`} className="post-link">@{post.username}</Link></h5> {/* Display the username */}
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
