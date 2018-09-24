import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
import './CoffeeDetails.css'
// import {showLastCoffee} from '../../ducks/reducer';

class CoffeeDetails extends Component {

    constructor (props) {
        super (props);

        this.state = {
            // latestCoffee: [], //instead of this, add each thing like you did in addcoffee
            coffeename: '',
            coffeeroaster: '',
            coffeeorigin: '',
            coffeebrewmethod: '',
            coffeeweight: '',
            waterweight: '',
            rating: '',
            additionalthoughts: '',
            editThoughtsToggle: false,
            editThoughtsInput: '',
            coffee_id: 0
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEditInput = this.handleEditInput.bind(this);
        this.updateThoughts = this.updateThoughts.bind(this);

        
    }
    
    componentDidMount () {
        axios.get('/api/coffees/get-latest')
        .then(res => {
            console.log('I am resdata', res.data[0])
            this.setState({
                coffeename: res.data[0].coffeename,
                coffeeroaster: res.data[0].coffeeroaster,
                coffeeorigin: res.data[0].coffeeorigin,
                coffeebrewmethod: res.data[0].coffeebrewmethod,
                coffeeweight: res.data[0].coffeeweight,
                waterweight: res.data[0].waterweight,
                rating: res.data[0].rating,
                additionalthoughts: res.data[0].additionalthoughts,
                editThoughtsInput: res.data[0].additionalthoughts,
                coffee_id: res.data[0].coffee_id
            })})
    }

    handleEditClick () {
        this.state.editThoughtsToggle 
        ? this.handleSave() 
        : this.setState({editThoughtsToggle:true})
    }

    handleSave () {
        this.updateThoughts(this.state.editThoughtsInput, this.state.coffee_id)
        this.setState({editThoughtsToggle:false})
    }

    handleEditInput(e){
        this.setState({
            editThoughtsInput: e.target.value
        })
    }

    updateThoughts (str, coffee_id) {
        axios.put(`/api/coffees/${coffee_id}`, {additionalthoughts: str})
        .then(res => this.setState({additionalthoughts: res.data[0].additionalthoughts}) 
        )
    }
    
    render () {

        // let {
        //     coffeename, 
        //     coffeeroaster, 
        //     coffeeorigin, 
        //     coffeebrewmethod,
        //     coffeeweight,
        //     waterweight,
        //     rating, 
        //     additionalthoughts
        // } = this.props.latestCoffee[0];

        
        console.log('And I am local state', this.state)
        
        return(
            <div>
                <div>
                    <Nav />
                </div>
                <div className="body">
                    <h1>
                        Coffee Details
                    </h1>

                    <h2>Display from the database the details of the coffee you just added</h2>
                    
                    <div>
                        <h3>Coffee Name: {this.state.coffeename}</h3>
                    </div>

                    <div>
                        <h3>Coffee Roaster: {this.state.coffeeroaster}</h3>
                    </div>

                    <div>
                        <h3>Coffee Origin: {this.state.coffeeorigin}</h3>
                    </div>

                    <div>
                        <h3>Brew Method: {this.state.coffeebrewmethod}</h3>
                    </div>

                    <div>
                        <h3>Coffee Weight: {this.state.coffeeweight}</h3>
                    </div>

                    <div>
                        <h3>Water Weight: {this.state.waterweight}</h3>
                    </div>

                    <div>
                        <h3>Rating: {this.state.rating}</h3>
                    </div>

                    <div className="additionalThoughts">
                        <h3>Additional Thoughts: {this.state.additionalthoughts}</h3>
                        {
                            this.state.editThoughtsToggle ? <input onChange={this.handleEditInput}
                            value={this.state.editThoughtsInput} />
                            : <div>{this.state.latestCoffee}</div>
                        }
                        <button onClick={this.handleEditClick}>
                        {
                            this.state.editThoughtsToggle ? 'Save' : 'Edit'
                        }
                        </button>
                    </div>

                    <div>
                        <button>Back To My List</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const {latestCoffee} = state;
    
    return {
        latestCoffee
        }
    }
    
    export default connect (mapStateToProps, /*{showLastCoffee}*/) (CoffeeDetails);