import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
        <h2>Welcome to Scuffed Insta</h2>
        <h5>To continue please login</h5>
        <Link as={Link} to={"/login"} className='btn btn-primary'>Login or Sign Up</Link>
    </div>
  )
}

export default Welcome