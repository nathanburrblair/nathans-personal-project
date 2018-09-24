import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Profile.css';

class Profile extends Component {

    constructor (props) {
        super(props)

        this.state = {
            myCoffees: []
        }
    }

    componentDidMount () {
        axios.get('/api/coffees/my-coffees')
        .then(res => this.setState({myCoffees: res.data}))
    }

    render () {
        console.log(this.state)
 
        let coffeesToDisplay = this.state.myCoffees.map((element, i) => {
           return (
               <div className="myCoffees">
                   <ul className="singleMyCoffee">
                        <li coffeename={i}>Coffee Name: {element.coffeename}</li>
                        <li coffeeroaster={i}>Roaster: {element.coffeeroaster}</li>
                        <li coffeeorigin={i}>Origin: {element.coffeeorigin}</li>
                        <li coffeebrewmethod={i}>Brew Method: {element.coffeebrewmethod}</li>
                        <li coffeeweight={i}>Coffee Weight (grams): {element.coffeeweight}</li>
                        <li waterweight={i}>Water Weight (grams): {element.waterweight}</li>
                        <li rating={i}>Rating: {element.rating}</li>
                        <li additionalthoughts={i}>Additional Thoughts: {element.additionalthoughts}</li>
                    </ul>
                </div>
            )
        })

        return(
            <div>
                <div className="headerNav">
                    <Nav />
                </div>
                <div className="body">
                    <h1>Your Profile</h1>
                    <h2>Coffees Tried:</h2>
                    <p>In a big feed, display all the coffes that this user has added.</p>
                    {coffeesToDisplay}
                </div>
            </div>
        )
    }
}

export default Profile