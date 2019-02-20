import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
  login() {
    //auth stuff for the frontend
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="mainBody">
        <div className="titleBlock">
          <div>
            <h1 className="mainTitle">ROASTED</h1>
          </div>
          <div className="twoButtons">
            <button className="mainLoginButton" onClick={this.login}>
              Login
            </button>
            <div className="space"></div>
            <Link to="/get-started"><button className="guestLogin">
              don't make me log in
            </button></Link>
          </div>
          <div className="mainSubtitle">
            <h3>an app for coffee lovers</h3>
          </div>
        </div>
      </div>
    );
  }
}
