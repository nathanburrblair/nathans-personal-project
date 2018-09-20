import React, {Component} from 'react';
import Nav from '../Nav/Nav';

class Profile extends Component {
    render () {
        return(
            <div>
                <Nav />
                <h1>
                    Your Profile
                </h1>
                <h2>Coffees Tried:</h2>
                <div>
                    <p>In a big feed, display all the coffes that this user has added.</p>
                </div>
            </div>
        )
    }
}

export default Profile