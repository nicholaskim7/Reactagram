import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Login.css';
import './Navibar.css';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container d-flex flex-column justify-content-center align-items-center text-center">
        <h2 className="welcome-title">Welcome to React-agram</h2>
        <h5 className="welcome-subtitle">To continue, please login</h5>
        <Link as={Link} to={"/login"} className='btn btn-primary welcome-btn'>Login or Sign Up</Link>
    </div>
  )
}

export default Welcome
