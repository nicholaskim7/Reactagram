import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const withoutNavBar = ["/login", "/loggedin/updatelogin/", "/loggedin/updateprofile/", "/create", "/users", "/"];

function Bar2() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const loggedInUserId = localStorage.getItem('loggedInUserId');

  if (withoutNavBar.some((item) => pathname === item)) return null;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      console.log("Username is empty");
      return;
    }
    navigate(`/publicprofile/${username}`, { state: { loggedInUserId } });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Form className="d-flex" onSubmit={handleSearchSubmit}>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={handleUsernameChange}
          />
        </InputGroup>
        <Button type="submit" className="ms-2">Search</Button>
      </Form>
      {/* <Nav className="ms-auto me-2">
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav> */}
    </Navbar>
  );
}

export default Bar2;