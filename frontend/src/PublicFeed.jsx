import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <div>For You Page (aka fetching all posts... no algo)</div>
            <div className='d-flex flex-column align-items-center'>
                <div className='mt-4 w-50 rounded p-3 custom-box'>
                    <div className="mb-2">
                        {posts.map(post => (
                            <div key={post.ID} className="post">
                                <h6>@{post.username}</h6> {/* Display the username */}
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
                </div>
            </div>
        </div>
    );
}

export default PublicFeed;
