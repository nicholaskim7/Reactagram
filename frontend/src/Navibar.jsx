import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './User';
import Login from './Login';
import In from './UserLoggedin';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

function Bar() {
  return (
      <div>
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    
  );
}

export default Bar;