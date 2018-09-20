import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
import {showLastCoffee} from '../../ducks/reducer';

class CoffeeDetails extends Component {
    
    componentDidMount () {
        axios.get('/api/coffees/get-latest')
        .then(res => this.props.showLastCoffee(res.data))
    }
    
    render () {

        let {
            coffeename, 
            coffeeroaster, 
            coffeeorigin, 
            coffeebrewmethod,
            coffeeweight,
            waterweight,
            rating, 
            additionalthoughts
        } = this.props.latestCoffee[0];

        console.log('I am props', this.props)
        return(
            <div>
                <Nav />
                <h1>
                    Coffee Details
                </h1>
                <h2>Display from the database all the details about a particular coffee</h2>
                <div>
                    <h3>Coffee Name: {coffeename}</h3>
                </div>
                <div>
                    <h3>Coffee Roaster: {coffeeroaster}</h3>
                </div>
                <div>
                    <h3>Coffee Origin: {coffeeorigin}</h3>
                </div>
                <div>
                    <h3>Brew Method: {coffeebrewmethod}</h3>
                </div>
                <div>
                    <h3>Coffee Weight: {coffeeweight}</h3>
                </div>
                <div>
                    <h3>Water Weight: {waterweight}</h3>
                </div>
                <div>
                    <h3>Rating: {rating}</h3>
                </div>
                <div>
                    <h3>Additional Thoughts: {additionalthoughts}</h3>
                </div>
                <div>
                    <button>Back To My List</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const {latestCoffee} = state;
    
    console.log('this is latest coffee', latestCoffee)
    return {
        latestCoffee
        }
    }
    
    export default connect (mapStateToProps, {showLastCoffee}) (CoffeeDetails);