import React, {Component} from 'react';
import {getUserData} from './../../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';

class Private extends Component {

    async componentDidMount () {
        let res = await axios.get('/api/user-data');
        //use action creator to update redux store
        this.props.getUserData(res.data)
    }

    render () {
        let {user_name, email, picture, auth_id} = this.props.user

        return (
            <div>
                <hr/>
                {
                    user_name ? (
                        <div>
                            <p>User: {user_name}</p>
                            <p>Email: {email}</p>
                            <p>Account Number: {auth_id}</p>
                            <img src={picture} alt=""/>
                        </div>
                    ): <p> Please Log In </p>
                }
                <a href='http://localhost:4400/logout'><button>Logout</button></a>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect (mapStateToProps, {getUserData})(Private);