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
    window.scrollTo(0, 0)
  }

  render() {
    console.log(this.state)
    let displayAllCoffees = this.state.allCoffees.map((element, i) => {
      return (
        <div className="allCoffees">
          <ul className="singleAllCoffees">
            <div className="allUserInfo">
              <div className="parentUser">
                <img className="userPicture" src={element.picture} alt=""/>
                <div className="userInfo" username={i}>{element.user_name}</div>
              </div>
              <div className="coffeename" coffeename={i}>{" "}{element.coffeename}</div>
                <div className="coffeeRoaster" coffeeroaster={i}>{element.coffeeroaster}</div>
              <div className="lineSeparator" />
              <div className="otherUserInfo">
                <li className="coffeeOrigin" coffeeorigin={i}>Origin: {element.coffeeorigin}</li>
                <li coffeebrewmethod={i}>Brew Method: {element.coffeebrewmethod}</li>
                <li coffeeweight={i}>Coffee Weight (grams): {element.coffeeweight}</li>
                <li waterweight={i}>Water Weight (grams): {element.waterweight}</li>
                <li rating={i}>Rating: {element.rating}</li>
                <li className='startAdditionalThoughts' additionalthoughts={i}>Additional Thoughts: {element.additionalthoughts}</li>
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
          <div className="welcomeText">
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
