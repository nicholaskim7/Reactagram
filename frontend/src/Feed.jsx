import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/posts')
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    return (
        <div className="feed">
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h3>{post.Text}</h3>
                    {JSON.parse(post.Images).map((imageUrl, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8081${imageUrl}`}
                            alt="Post"
                            style={{ width: '200px', height: 'auto', margin: '10px' }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Feed;
