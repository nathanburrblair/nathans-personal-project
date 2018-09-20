import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render () {
        return(
            <div className="headernav">
                <div className="logo">
                    Roasted
                </div>
                <ul className="navlinks">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/profile"><li>Profile</li></Link>
                    <Link to="/coffee-store"><li>Store</li></Link>
                    <li>Logout</li>
                </ul>
            </div>
        )
    }
}

export default Nav