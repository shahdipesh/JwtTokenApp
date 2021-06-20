import React from 'react';
import { Navbar, Container,Nav } from 'react-bootstrap';
import './header.css'
import { useSelector,useDispatch } from 'react-redux';
import setLoginStatus from '../../app/user/user.actions';
import {setUsers} from '../../app/user/user.actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const Header = () => {
    const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
    const dispatch = useDispatch()
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dummy</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home"><Link to="/home">Home</Link></Nav.Link>
                        <Nav.Link ><Link to="/features">Features</Link></Nav.Link>
                        <Nav.Link ><Link to="/contact">Contact</Link></Nav.Link>
                       { !isUserLoggedIn?<Nav.Link><Link to="/login">Login</Link></Nav.Link>:
                         <Nav.Link onClick={()=>{dispatch(setLoginStatus(false));dispatch(setUsers(null))}}><Link>Signout</Link></Nav.Link>
                       }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;