import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {addCoffee} from '../../ducks/reducer';
import axios from 'axios';

class AddCoffee extends Component {

    constructor(props) {
        super (props)

        this.state = {
            coffeeName: '',
            coffeeRoaster: '',
            coffeeOrigin: '',
            coffeeBrewMethod: '',
            coffeeWeight: 0,
            waterWeight: 0,
            rating: 0,
            additionalThoughts: ''
        }
      
        this.handleAddCoffee = this.handleAddCoffee.bind(this);

    }

    handleCoffeeName (name) {
        this.setState({
            coffeeName: name
        })
    }

    handleCoffeeRoaster (roaster) {
        this.setState({
            coffeeRoaster: roaster
        })
    }

    handleCoffeeOrigin (origin) {
        this.setState({
            coffeeOrigin: origin
        })
    }

    handleCoffeeBrewMethod (method) {
        this.setState({
            coffeeBrewMethod: method
        })
    }

    handleCoffeeWeight (cweight) {
        this.setState({
            coffeeWeight: cweight
        })
    }

    handleWaterWeight (wweight) {
        this.setState({
            waterWeight: wweight
        })
    }

    handleAdditionalThoughts (thoughts) {
        this.setState({
            additionalThoughts: thoughts
        })
    }

    handleAddCoffee () {
        const coffee = {
            coffeename: this.state.coffeeName,
            coffeeroaster: this.state.coffeeRoaster,
            coffeeorigin: this.state.coffeeOrigin,
            coffeebrewmethod: this.state.coffeeBrewMethod,
            coffeeweight: this.state.coffeeWeight,
            waterweight: this.state.waterWeight,
            rating: this.state.rating,
            additionalthoughts: this.state.additionalThoughts
        }

        axios.post('/api/coffees', {coffee}).then(res => {
            this.props.addCoffee(res.data)
            this.props.history.push('/coffee-details') //using this instead of wrapping the Add button in Link. This pushed the coffee-details page on to the history array, which is just an array of the pages I've been. So now the axios.post is done by the time I get to the next page, and the current coffee displays instead of the second to most recent one. 
        })
        
    }

    render () {
        console.log(this.state)
        return(
            <div>
                <Nav />
                <h1>
                    Add Your Coffee
                </h1>
                <div>
                    <h2>Coffee Name</h2>
                    <input onChange={(e) => this.handleCoffeeName(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Coffee Roaster</h2>
                    <input onChange={(e) => this.handleCoffeeRoaster(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Coffee Origin</h2>
                    <input onChange={(e) => this.handleCoffeeOrigin(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Brew Method</h2>
                    <input onChange={(e) => this.handleCoffeeBrewMethod(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Coffee Weight</h2>
                    <input onChange={(e) => this.handleCoffeeWeight(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Water Weight</h2>
                    <input onChange={(e) => this.handleWaterWeight(e.target.value)} type="text"/>
                </div>
                <div>
                    <h2>Rating:</h2>
                </div>
                <div>
                    <h2>Additional Thoughts</h2>
                    <input onChange={(e) => this.handleAdditionalThoughts(e.target.value)} type="text"/>
                </div>
                <div>
                    <button onClick={this.handleAddCoffee}>Add</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const {coffeeDetails} = state;

console.log('this is coffee details', coffeeDetails)

    return (
        coffeeDetails
    )
}

export default connect (mapStateToProps, {addCoffee}) (AddCoffee);