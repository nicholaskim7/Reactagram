import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navibar.css';


const withoutNavBar = ["/login", "/loggedin/updatelogin/", "/loggedin/updateprofile/", "/create", "/users", "/"];

function Bar2() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const loggedInUserId = localStorage.getItem('loggedInUserId');

  if (withoutNavBar.some((item) => pathname === item)) return null;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      console.log("Username is empty");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8081/check-username/${username}`);
      if (response.data.userExists) {
        setError('');
        navigate(`/publicprofile/${username}`, { state: { loggedInUserId } });
        setUsername(''); // Clear the input field
        setIsSearchExpanded(false); // Close the search bar
      }
      else{
        setError('Username does not exist');
      }
    } catch (error) {
      setError('Error checking username');
    }

    try {
      const response = await axios.get(`http://localhost:8081/check-username/${username}`);
      if (response.data.userExists) {
        setError('');
        navigate(`/publicprofile/${username}`, { state: { loggedInUserId } });
        setUsername(''); // Clear the input field
        setIsSearchExpanded(false); // Close the search bar
      }
      else{
        setError('Username does not exist');
      }
    } catch (error) {
      setError('Error checking username');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto d-flex align-items-center">
          <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <Button className="my-custom-button" onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
                <FaSearch />
              </Button>
              {isSearchExpanded && (
                <Form className="d-flex ms-2" onSubmit={handleSearchSubmit}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <Button type="submit" className="ms-2">Search</Button>
                  </InputGroup>
                </Form>
              )}
            </div>
          {loggedInUserId ? (
            <div style={{ display: 'flex', gap: '2px' }}>
              <Nav.Link as={Link} to={`/loggedin/${loggedInUserId}`}>Your page</Nav.Link>
              <Nav.Link as={Link} to={`/hard-75/${loggedInUserId}`}>75-hard</Nav.Link>
            </div>
          ) : (
            <Nav.Link disabled>Your page</Nav.Link> // Disabled if ID is not available
          )}
          <Nav.Link as={Link} to="/posts">For You Page</Nav.Link>
          <Nav.Link as={Link} to="/draw">doodle</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {error && <div className="text-danger ms-3">{error}</div>}
    </Navbar>
  );
}

export default Bar2;
