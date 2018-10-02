import React, { Component } from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./GetStarted.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

class GetStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCoffees: []
    };
  }

  componentDidMount() {
    axios.get("/api/coffees/all-coffees").then(res =>
      this.setState({
        allCoffees: res.data
      })
    );
  }

  render() {
    let displayAllCoffees = this.state.allCoffees.map((element, i) => {
      return (
        <div className="allCoffees">
          <ul className="singleAllCoffees">
            <div className="coffeename" coffeename={i}>{" "}{element.coffeename}</div>
            <div className="lineSeparator" />
            <div className="allUserInfo">
              <div className="parentUser">
                {/* <li className="userInfo" username={i}>User: {element.user_name}</li> */}
                <p>User image</p>
              </div>
              <div className="otherUserInfo">
                <li className="coffeeRoaster" coffeeroaster={i}>Roaster: {element.coffeeroaster}</li>
                <li className="coffeeOrigin" coffeeorigin={i}>Origin: {element.coffeeorigin}</li>
                <li coffeebrewmethod={i}>Brew Method: {element.coffeebrewmethod}</li>
                <li coffeeweight={i}>Coffee Weight (grams): {element.coffeeweight}</li>
                <li waterweight={i}>Water Weight (grams): {element.waterweight}</li>
                <li rating={i}>Rating: {element.rating}</li>
                <li additionalthoughts={i}>Additional Thoughts: {element.additionalthoughts}</li>
              </div>
            </div>
          </ul>
        </div>
      );
    });

    return (
      <div className="wholeThing">
        <Sidebar />
        <Nav />
        <div className="body" />
        <div className="belowImage">
          <div>
            <h1>Add a coffee to get started</h1>
            <div>
              <Link to="/add-coffee">
                <button className="addCoffeeButton">Add a Coffee</button>
              </Link>
            </div>
            <h3>Or, see what others are drinking:</h3>
          </div>
        </div>
        {displayAllCoffees}
      </div>
    );
  }
}

export default GetStarted;
