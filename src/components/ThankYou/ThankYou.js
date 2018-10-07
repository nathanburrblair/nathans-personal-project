import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import './ThankYou.css';
import Sidebar from "../Sidebar/Sidebar";

class ThankYou extends Component {

    componentDidMount () {
        window.scrollTo(0, 0)
    }

    render () {
        return(
            <div>
                <header className="thankyouHeader">
                    <Sidebar />
                    <Nav />
                </header>
                <body className="thankyouBody">
                    <h1>
                        Thank you for ordering
                    </h1>
                    <div className="thankyouBackground">
                        <div className="thankyouContainer">
                            <h1 className="thankyouText">Thank you</h1>
                            <p>Your order won't be on it's way soon because this isn't a real store.</p>
                        </div>
                    </div>
                </body>
                <footer className="thankyouFooter">

                </footer>
            </div>
        )
    }
}

export default ThankYou