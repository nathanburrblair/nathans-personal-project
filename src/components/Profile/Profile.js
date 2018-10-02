import React, { Component } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCoffees: []
    };

this.handleDelete = this.handleDelete.bind(this);

  }

  componentDidMount() {
    axios
      .get("/api/coffees/my-coffees")
      .then(res => this.setState({ myCoffees: res.data }));
  }

  handleDelete (coffee_id) {
    axios.delete(`/api/coffees/my-coffees/${coffee_id}`)
    .then( res => this.setState({myCoffees: res.data}))
  }

  render() {
    console.log(this.state);
    console.log(this.state.myCoffees)
    let coffeesToDisplay = this.state.myCoffees.map((element, i) => {
      return (
        <div className="myCoffees">
          <ul className="singleMyCoffee">
            <div className="myCoffeeName" coffeename={i}>{" "}{element.coffeename}</div>
            <div className="lineSeparator" />
            <li email={i}>Email: {element.email}</li>
            <li coffeeroaster={i}>Roaster: {element.coffeeroaster}</li>
            <li coffeeorigin={i}>Origin: {element.coffeeorigin}</li>
            <li coffeebrewmethod={i}>Brew Method: {element.coffeebrewmethod}</li>
            <li coffeeweight={i}>Coffee Weight (grams): {element.coffeeweight}</li>
            <li waterweight={i}>Water Weight (grams): {element.waterweight}</li>
            <li rating={i}>Rating: {element.rating}</li>
            <li additionalthoughts={i}>Additional Thoughts: {element.additionalthoughts}</li>
            <button onClick={this.handleDelete}>Delete</button>
          </ul>
        </div>
      );
    });

    return (
      <div className="allMyCoffees">
        <Sidebar />
        <Nav />
        <div className="myCoffeesBody" />
        <div className="belowCoffeeImage">
          <div>
            <h1>Your Profile</h1>
            <div>
              <h3>Coffees Tried:</h3>
              {coffeesToDisplay}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
