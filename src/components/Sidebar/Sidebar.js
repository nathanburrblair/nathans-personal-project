import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import './Sidebar.css';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    render () {
        return (
            <Menu>
                <Link to="/get-started">Home</Link>
                <Link to="/add-coffee">Add A Coffee</Link>
                <Link to="/profile">Your Profile</Link>
                <Link to="/coffee-store">Shop</Link>
            </Menu>
        )
    }
}

export default Sidebar