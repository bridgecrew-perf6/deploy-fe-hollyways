import { React, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Dropdown, Container } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom';

import logo from "../images/logo.png";
import profileImage from "../images/profile.png"
import userIcon from "../images/user.png"
import logoutIcon from "../images/logout.png"
import raiseFundIcon from "../images/Group 4.png"

import { Link } from "react-router-dom";

import Login from '../pages/Login';
import Register from '../pages/Register';

import { UserContext } from '../context/UserContext'

function Privatepage() {
    const [ ,dispatch] = useContext(UserContext)
    // let history = useHistory();

    // console.log(dispatch)
    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        // history.push('/')
        <Link to="/" />
    }

  return (
    <div>
      <li className=''>
      <Dropdown class= "dropdown mr-5">
          <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
            <Image src={profileImage} roundedCircle style={{width: '40px', height: '40px'}}/>
          </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className=''>
                <Link to="/user" className='profile'>
                <Image src={userIcon} thumbnail style={{height: '30px'}}/> Profile
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/raisefund" className='profile'>
                <Image src={raiseFundIcon} thumbnail style={{height: '30px'}}/>  Raise Fund
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/" onClick={handleLogout} className='profile'>
                <Image src={logoutIcon} thumbnail style={{ height: '30px' }} /> Logout
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </div>
  )
}

function GuestPage() {
  return (
    <div className='btn-group d-flex align-items-middle'>
      <li>
        <Login />
      </li>
      <li>
        <Register />
      </li>
    </div>
  )
}

function Navbar() {
  const [state] = useContext(UserContext)
//   console.log(state)

  return (
      <nav>
        <Container fluid>
          <ul className='d-flex justify-content-between align-items-center'>
            <li>
            <Link to="/" className='logo'>
                <Image src={logo} alt="logo" />
            </Link>
            </li>

          <li className='btn-group mx-5'>
            {state.isLogin ? (
              <Privatepage />
            ) : (
                <GuestPage />
              )}
            </li>
          </ul>
        </Container>
      </nav>
  )
}

export default Navbar