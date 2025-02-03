import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './Login.css';

function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8012/create', {name, email, password})
        .then(res => {
            setMessage(res.data.message);
            if (res.data.message === "User created successfully...") {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        })
        .catch(err => {
            console.log(err);
            setMessage(err.response?.data?.Error || 'Error creating user');
        });
    }

  return (
    <div className='welcome-container d-flex flex-column justify-content-center align-items-center text-center'>
        <div className='login-card p-4 shadow-lg'>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-3">Sign Up</h2>
                <div className='mb-3 text-start'>
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" placeholder='Enter Name' className="form-control"
                    onChange={e => setName(e.target.value)} required
                    />
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor="" className="form-label">Email</label>
                    <input type="email" placeholder='Enter Email' className="form-control"
                    onChange={e => setEmail(e.target.value)} required
                    />
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor="" className="form-label">Password</label>
                    <input type="text" placeholder='Enter Password' className="form-control"
                    onChange={e => setPassword(e.target.value)} required
                    />
                </div>
                <div className="d-grid gap-2">
                    <button className="btn welcome-btn">Submit</button>
                </div>
                
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    </div>
  )
};

export default CreateUser
