import React, { Component } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { connect } from "react-redux";
import "./CoffeeDetails.css";
import Sidebar from "../Sidebar/Sidebar";
// import {showLastCoffee} from '../../ducks/reducer';

class CoffeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // latestCoffee: [], //instead of this, add each thing like you did in addcoffee
      coffeename: "",
      coffeeroaster: "",
      coffeeorigin: "",
      coffeebrewmethod: "",
      coffeeweight: "",
      waterweight: "",
      rating: "",
      additionalthoughts: "",
      editThoughtsToggle: false,
      editThoughtsInput: "",
      coffee_id: 0,
      // editNameToggle: false,
      // editNameInput: ""
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.updateThoughts = this.updateThoughts.bind(this);

    // this.handleEditName = this.handleEditName.bind(this);
    // this.handleNameClick = this.handleNameClick.bind(this);
    // this.handleNameSave = this.handleNameSave.bind(this);
    // this.updateName = this.updateName.bind(this); 
  }

  componentDidMount() {
    axios.get("/api/coffees/get-latest").then(res => {
      console.log("I am resdata", res.data[0]);
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
        coffee_id: res.data[0].coffee_id,
        // editNameInput: res.data[0].coffeename
      });
    });
    window.scrollTo(0, 0)
  }

  handleEditClick() {
    this.state.editThoughtsToggle
      ? this.handleSave()
      : this.setState({ editThoughtsToggle: true });
  }

  handleSave() {
    this.updateThoughts(this.state.editThoughtsInput, this.state.coffee_id);
    this.setState({ editThoughtsToggle: false });
  }

  handleEditInput(e) {
    this.setState({
      editThoughtsInput: e.target.value
    });
  }

  updateThoughts(str, coffee_id) {
    axios
      .put(`/api/coffees/${coffee_id}`, { additionalthoughts: str })
      .then(res =>
        this.setState({ additionalthoughts: res.data[0].additionalthoughts })
      );
  }

  //This allows me to edit the coffee name

  // handleEditName(e) {
  //     this.setState({
  //       editNameInput: e.target.value
  //     })
  // }

  // handleNameClick () {
  //     this.state.editThoughtsToggle
  //     ? this.handleNameSave()
  //     : this.setState({ editNameToggle: true })

  // }

  // handleNameSave() {
  //     this.updateName(this.state.editNameInput, this.state.coffee_id);
  //       this.setState({editNameToggle: false})
  // }

  // updateName(str, coffee_id) {
  //   axios.put(`/api/coffees/${coffee_id}`, {coffeename: str})
  //   .then(res =>
  //       this.setState({coffeename: res.data[0].coffeename}))
  // }

  render() {
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

    console.log("And I am local state", this.state);

    return (
      <div className="allDetails">
        <Sidebar />
        <Nav />
        <div className="detailsBody" />

        <h1 className="coffeedetails">{this.state.coffeename}</h1>
        {/* <div className="additionalThoughts">
          <h3>Coffee Name:</h3> 
          <h4>{this.state.coffeename}</h4>
          {this.state.editNameToggle ? (
            <input
              placeholder="Your Thoughts Here"
              onChange={this.handleEditName}
              value={this.state.editNameInput}
            />
          ) : (
            <div>{this.state.latestCoffee}</div>
          )}
          <button className="editButton" onClick={this.handleNameClick}>
            {this.state.editNameToggle ? "Save" : "Edit"}
          </button>
        </div> */}

        <div>
          <h3 className="detailItem">Roaster: {this.state.coffeeroaster}</h3>
        </div>

        <div>
          <h3 className="detailItem">Origin: {this.state.coffeeorigin}</h3>
        </div>

        <div>
          <h3 className="detailItem">Method: {this.state.coffeebrewmethod}</h3>
        </div>

        <div>
          <h3 className="detailItem">
            Coffee Weight (g): {this.state.coffeeweight}
          </h3>
        </div>

        <div>
          <h3 className="detailItem">
            Water Weight(g): {this.state.waterweight}
          </h3>
        </div>

        <div>
          <h3 className="detailItem">Rating: {this.state.rating}</h3>
        </div>

        <div className="additionalThoughts">
          <h3>Additional Thoughts:</h3> 
          {this.state.editThoughtsToggle ? (
            <input
              placeholder="Your Thoughts Here"
              onChange={this.handleEditInput}
              value={this.state.editThoughtsInput}
            />
          ) : (
            <h4>{this.state.additionalthoughts}</h4>
          )}
          <button className="editButton" onClick={this.handleEditClick}>
            {this.state.editThoughtsToggle ? "Save" : "Edit"}
          </button>
        </div>


        <div>
          <button>Back To My List</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { latestCoffee } = state;

  return {
    latestCoffee
  };
}

export default connect(mapStateToProps /*{showLastCoffee}*/)(CoffeeDetails);
