import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';

class GetStarted extends Component {
    render () {
        return(
            <div>
                <Nav />
                <h1>Add a coffee to get started</h1>
                <div>
                    <Link to="/add-coffee"><button>Add a Coffee</button></Link>
                </div>
                <div>
                    <p>In a big feed, display every coffee that users are adding</p>
                </div>
            </div>
        )
    }
}

export default GetStarted