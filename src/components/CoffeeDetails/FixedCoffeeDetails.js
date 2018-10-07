import React, { Component } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { connect } from "react-redux";
import "./FixedDetails.css";
import Sidebar from "../Sidebar/Sidebar";

import autosize from "autosize";
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
      coffee_id: 0
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
        coffee_id: res.data[0].coffee_id
        // editNameInput: res.data[0].coffeename
      });
    });
    window.scrollTo(0, 0);
    // this.textarea.focus();
    autosize(this.textarea);
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

    const style = {
      maxHeight: "75px",
      minHeight: "111px",
      resize: "none",
      padding: "9px",
      boxSizing: "border-box",
      fontSize: "16px"
    };

    console.log("And I am local state", this.state);


        return(
            <div className="theDetailsEverything">
                <header className="theHeader">
                    <Sidebar />
                    <Nav />
                </header>
                <body className="theDetailsBody">
                    <div className="theDetailsBackground">
                        <div className="innerWrapTheThing">
                            <h1 className="coffeedetails">{this.state.coffeename}</h1>

                            <div className="roastDetail">{this.state.coffeeroaster}</div>
                            <div className="lineSeparator" />
                            <div className="detailItem">Origin: {this.state.coffeeorigin}</div>
                            <div className="detailItem">Method: {this.state.coffeebrewmethod}</div>
                            <div className="detailItem">Coffee Weight (g): {this.state.coffeeweight}</div>
                            <div className="detailItem">Water Weight(g): {this.state.waterweight}</div>
                            <div className="detailItem">Rating: {this.state.rating}</div>
                            <div className="additionalThoughts">
                            <div>Additional Thoughts:</div>
                            {this.state.editThoughtsToggle ? (
                                <textarea
                                style={style}
                                ref={c => (this.textarea = c)}
                                rows={1}
                                defaultValue=""
                                className="thoughtsInput"
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
                        </div>
                    </div>
                </body>
                <footer className="theDetailsFooter">

                </footer>
            </div>
        ) 
    }
}

function mapStateToProps(state) {
    const { latestCoffee } = state;
      
    return {
        latestCoffee
    };
}
      
export default connect(mapStateToProps /*{showLastCoffee}*/)(CoffeeDetails);