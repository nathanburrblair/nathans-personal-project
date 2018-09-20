import React, {Component} from 'react';
import Nav from '../Nav/Nav';

class Cart extends Component {
    render () {
        return(
            <div>
                <Nav />
                <h1>
                    All the things in your shopping cart
                </h1>
            </div>
        )
    }
}

export default Cart