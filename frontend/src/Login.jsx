import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css'
import './Login.css'
import './Welcome.css';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8012/login', { email, password })
        .then(res => {
            setMessage(res.data.message);
            if (res.data.message === 'Login successful...') {
                const userId = res.data.userId;
                localStorage.setItem('loggedInUserId', res.data.userId);
                setTimeout(() => {
                    //navigate(`/loggedin/${userId}`);
                    navigate('/posts');
                }, 2000);
            }
        })
        .catch(err => {
            setMessage(err.response?.data?.message || 'An error occurred');
        });
    }

  return (
        <div className="welcome-container d-flex flex-column justify-content-center align-items-center text-center">
            <div className="login-card p-4 shadow-lg">
                <h2 className="mb-3">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                        onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control"
                        onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn welcome-btn">Login</button>
                        <Link to="/create" className="btn btn-outline-primary">Create Account</Link>
                    </div>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
        </div>
    
  )
}

export default Login
