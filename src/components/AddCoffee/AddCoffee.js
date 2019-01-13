import React, { Component } from "react";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import { addCoffee } from "../../ducks/reducer";
import axios from "axios";
import "./AddCoffee.css";
import Sidebar from "../Sidebar/Sidebar";
import Dropzone from "react-dropzone";

//For dropzone image preview
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 80,
  height: 80,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 272,
  height: 180,
  borderWidth: 1,
  borderColor: "#666",
  backgroundColor: "#ded9d3",
  borderRadius: 2,
  marginTop: 10,
  marginBottom: 10
};
const activeStyle = {
  borderStyle: "solid",
  borderColor: "#6c6",
  backgroundColor: "#eee"
};
const rejectStyle = {
  borderStyle: "solid",
  borderColor: "#c66",
  backgroundColor: "#eee"
};
//end dropzone image preview

class AddCoffee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coffeeName: "",
      coffeeRoaster: "",
      coffeeOrigin: "",
      coffeeBrewMethod: "",
      coffeeWeight: 0,
      waterWeight: 0,
      rating: 0,
      additionalThoughts: "",
      coffeeImage: "",
      files: []
    };

    this.handleAddCoffee = this.handleAddCoffee.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCoffeeName(name) {
    this.setState({
      coffeeName: name
    });
  }

  handleCoffeeRoaster(roaster) {
    this.setState({
      coffeeRoaster: roaster
    });
  }

  handleCoffeeOrigin(origin) {
    this.setState({
      coffeeOrigin: origin
    });
  }

  handleCoffeeBrewMethod(method) {
    this.setState({
      coffeeBrewMethod: method
    });
  }

  handleCoffeeWeight(cweight) {
    this.setState({
      coffeeWeight: cweight
    });
  }

  handleWaterWeight(wweight) {
    this.setState({
      waterWeight: wweight
    });
  }

  handleAdditionalThoughts(thoughts) {
    this.setState({
      additionalThoughts: thoughts
    });
  }

  handleAddCoffee() {
    const coffee = {
      coffeename: this.state.coffeeName,
      coffeeroaster: this.state.coffeeRoaster,
      coffeeorigin: this.state.coffeeOrigin,
      coffeebrewmethod: this.state.coffeeBrewMethod,
      coffeeweight: this.state.coffeeWeight,
      waterweight: this.state.waterWeight,
      rating: this.state.rating,
      additionalthoughts: this.state.additionalThoughts,
      coffeeimage: this.state.coffeeImage
    };

    axios.post("/api/coffees", { coffee }).then(res => {
      this.props.addCoffee(res.data);
      this.props.history.push("/coffee-details"); //using this instead of wrapping the Add button in Link. This pushed the coffee-details page on to the history array, which is just an array of the pages I've been. So now the axios.post is done by the time I get to the next page, and the current coffee displays instead of the second to most recent one.
    });
  }

  handleUploadImage = files => {
    const {
      REACT_APP_CLOUDINARY_URL,
      REACT_APP_CLOUDINARY_API,
      REACT_APP_CLOUDINARY_PRESET
    } = process.env;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("tags", "coffee, medium");
    formData.append("upload_preset", `${REACT_APP_CLOUDINARY_PRESET}`);
    formData.append("api_key", `${REACT_APP_CLOUDINARY_API}`);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    axios.post(`${REACT_APP_CLOUDINARY_URL}`, formData).then(res => {
      console.log("Hello");
      this.setState({
        coffeeImage: res.data.secure_url,
        files: files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      });
    });
  };

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    console.log(this.state);

    const { files } = this.state;

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="" />
        </div>
      </div>
    ));

    return (
      <div className="wholeAddBody">
        <Sidebar />
        <Nav />
        <div className="addBody" />
        <div>
          <h1 className="add">Add Your Coffee</h1>

          <Dropzone onDrop={this.handleUploadImage} multiple accept="image/*">
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject
            }) => {
              let styles = { ...baseStyle };
              styles = isDragActive ? { ...styles, ...activeStyle } : styles;
              styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

              return (
                <div className="dragbox">
                  <div className="inner_box" {...getRootProps()} style={styles}>
                    <input {...getInputProps()} />
                    <div className="dragbox_text">{isDragAccept ? "Drop" : "Drag"} photo here...</div>
                    {isDragReject && <div>Unsupported file type...</div>}
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </div>
                </div>
              );
            }}
          </Dropzone>


          <div>
            <h3 className="subtitle">Coffee Name</h3>
            <input
              onChange={e => this.handleCoffeeName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Coffee Roaster</h3>
            <input
              onChange={e => this.handleCoffeeRoaster(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Coffee Origin</h3>
            <input
              onChange={e => this.handleCoffeeOrigin(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Brew Method</h3>
            <input
              onChange={e => this.handleCoffeeBrewMethod(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Coffee Weight</h3>
            <input
              onChange={e => this.handleCoffeeWeight(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Water Weight</h3>
            <input
              onChange={e => this.handleWaterWeight(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <h3 className="subtitle">Rating:</h3>
          </div>
          <div>
            <h3 className="subtitle">Additional Thoughts</h3>
            <input
              className="thoughtsInput"
              onChange={e => this.handleAdditionalThoughts(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <button className="addSingleCoffee" onClick={this.handleAddCoffee}>
              Add
            </button>
          </div>

        </div>
        <footer className="footer">
          <p>Roasted 2018</p>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { coffeeDetails } = state;

  console.log("this is coffee details", coffeeDetails);

  return coffeeDetails;
}

export default connect(
  mapStateToProps,
  { addCoffee }
)(AddCoffee);
