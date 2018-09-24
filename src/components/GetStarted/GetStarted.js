import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import './GetStarted.css'
import axios from 'axios';

class GetStarted extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allCoffees: []
        }
    }

    componentDidMount () {
        axios.get('/api/coffees/all-coffees')
        .then(res => this.setState ({
            allCoffees: res.data
        }))
    }

    render () {

        let displayAllCoffees = this.state.allCoffees.map((element, i) => {
            return (
                 <div className="allCoffees">
                   <ul className="singleAllCoffees">
                        <div className="coffeename" coffeename={i}> {element.coffeename}</div>
                        <div className="lineSeparator" />
                        <li username={i}>User: {element.user_name}</li>
                        <li className="coffeeRoaster" coffeeroaster={i}>Roaster: {element.coffeeroaster}</li>
                        <li className="coffeeOrigin" coffeeorigin={i}>Origin: {element.coffeeorigin}</li>
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
                    <h1>Add a coffee to get started</h1>
                    <div>
                        <Link to="/add-coffee"><button className="addCoffeeButton">Add a Coffee</button></Link>
                    </div>
                    <div>
                        <p>Or, see what others are drinking:</p>
                    </div>
                </div>
                    {displayAllCoffees}
            </div>
        )
    }
}

export default GetStarted