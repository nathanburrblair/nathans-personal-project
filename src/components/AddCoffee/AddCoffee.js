import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {addCoffee} from '../../ducks/reducer';
import axios from 'axios';
import './AddCoffee.css';
import Sidebar from '../Sidebar/Sidebar';

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

    componentDidMount () {
        window.scrollTo(0, 0)
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
            <div className="wholeAddBody">
            <Sidebar />
                <Nav />
                <div className="addBody"></div>
                    <div>
                    <h1 className="add">Add Your Coffee</h1>
                    <div>
                        <h3 className="subtitle">Coffee Name</h3>
                        <input onChange={(e) => this.handleCoffeeName(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Coffee Roaster</h3>
                        <input onChange={(e) => this.handleCoffeeRoaster(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Coffee Origin</h3>
                        <input onChange={(e) => this.handleCoffeeOrigin(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Brew Method</h3>
                        <input onChange={(e) => this.handleCoffeeBrewMethod(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Coffee Weight</h3>
                        <input onChange={(e) => this.handleCoffeeWeight(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Water Weight</h3>
                        <input onChange={(e) => this.handleWaterWeight(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <h3 className="subtitle">Rating:</h3>
                    </div>
                    <div>
                        <h3 className="subtitle">Additional Thoughts</h3>
                        <input className="thoughtsInput" onChange={(e) => this.handleAdditionalThoughts(e.target.value)} type="text"/>
                    </div>
                    <div>
                        <button className="addSingleCoffee" onClick={this.handleAddCoffee}>Add</button>
                    </div>
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