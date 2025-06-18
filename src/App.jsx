import React, { Component } from 'react'
import './App.css'
import SignIn from "./Components/SignIn/SignIn"
import RegisterPage from './Components/RegisterPage/RegisterPage'
import Navigation from "./Components/Navigation/Navigation"
import Logo from "./Components/Logo/Logo"
import Rank from "./Components/Rank/Rank"
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm"
import FaceDetector from "./Components/FaceDetector/FaceDetector"
import ParticlesBg from 'particles-bg'
import { routeOptions } from './constants';

const initialState ={
  input: "",
  imageURL: "",
  boundingBoxesInfo: [],
  output: "",
  isSignedIn: false,
  route: routeOptions.SignIn,
  user:{
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
export class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  loadAcc = (userX) => {
    this.setState(() => ({
      input : "",
      imageURL: "",
      boundingBoxesInfo: [],
      output: "",
      user : userX
    })
    // , () => {console.log(this.state)}
    )
  }

  updateNumEntries = () => { // only worked in POSTMAN but not yet tested through the app cuz i couldn't get the API to work
    fetch(`https://2zklg96udc.execute-api.us-east-1.amazonaws.com/image`, {
      method: "put",
      headers: {'content-Type' : "application/json"},
      body : JSON.stringify({
        id : this.state.user.id
      })
    }).then(
      response => response.json()
    ).then(response => {
      // console.log("this is in update entries num. response = ", response)
      if (response === "failed to update rank"){
        return
      } else {
        this.setState(prevState => ({
          user:{
            ...prevState.user,
            entries: response.entries
        }})
        // , () => {console.log("updateNumEntries: ", this.state)}
        )
      }
    }).catch((err) => {console.log(err)})
  }

  updateIsSignedIn = () => {
    this.setState(prevState => ({ isSignedIn: !prevState.isSignedIn }));
  }

  onInputchange = (event) => {
    // console.log(event.target.value)
    this.setState({
      input: event.target.value
    })
    // console.log(this.state)
  }

  setBoundingBoxes = (regions) => { // regions = result.outputs[0].data.regions
    // https://www.shutterstock.com/image-photo/happy-businessman-enjoying-home-office-600nw-2257033579.jpg
    // https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15002495/friendscast.0.0.1429818191.jpg?quality=90&strip=all&crop=11.091820987654,0,77.816358024691,100

    // console.log("in the setBoundingBoxes function")
    let BoundingBoxes_f = [];

    const inputIMG = document.getElementById("inputImage")
    const width = Number(inputIMG.width)
    const height = Number(inputIMG.height)
    // console.log(width, height)

    regions.forEach(region => {
      // console.log("region: ", region)
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      // TODO: might need to look into this calculations later
      const topRow = boundingBox.top_row.toFixed(3) * height;
      const rightCol = width - (boundingBox.right_col.toFixed(3) * width);
      const bottomRow = height - (boundingBox.bottom_row.toFixed(3) * height);
      const leftCol = boundingBox.left_col.toFixed(3) * width;
      // console.log(`BBox: ${topRow}, ${rightCol}, ${bottomRow}, ${leftCol}`);

      region.data.concepts.forEach(concept => {
          // Accessing and rounding the concept value
          const name = concept.name;
          const value = concept.value.toFixed(4);

          // console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
          const box = {
            "name": name, 
            "value": value,
            "topRow": topRow,
            "leftCol": leftCol,
            "bottomRow": bottomRow,
            "rightCol": rightCol
          };
          // console.log("box: ", box)
          BoundingBoxes_f.push(box);
          // console.log("BoundingBoxes_f: ", BoundingBoxes_f)
      });
      this.setState({
        boundingBoxesInfo: BoundingBoxes_f
      });
    });
    this.setState((prev) => {
      prev
    }
    // , () => {console.log(this.state.boundingBoxesInfo)}
    )
  }

  // fetching from back end instead of client side for security safety
  onButtonSubmit2 = () => {
    // https://www.shutterstock.com/image-photo/happy-businessman-enjoying-home-office-600nw-2257033579.jpg
    // https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15002495/friendscast.0.0.1429818191.jpg?quality=90&strip=all&crop=11.091820987654,0,77.816358024691,100
    this.setState({ boundingBoxesInfo: "", imageURL: this.state.input  }, () => {
      // Proceed with setting the imageURL and making the fetch request
      fetch(`https://2zklg96udc.execute-api.us-east-1.amazonaws.com/promptingClarifai`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imgURL: this.state.input,
        }),
      }).then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status.code !== 10000) {
          console.log("Failed to get output");
          return;
        }
        // TODO: update the rank
        this.updateNumEntries()
        return this.setBoundingBoxes(data.outputs[0].data.regions);
      })
      .catch(() => {
        console.log("Failed to get output");
      });
    });
  }
  
  onRouteChange = (newRoute) => {
    // console.log("b4 change: ", this.state.route)
    this.setState({route: newRoute})
    // console.log("after change: ", this.state.route)
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} className="particles"/>
        {this.state.route === routeOptions.SignIn && <div>
          <Navigation onRouteChange={this.onRouteChange} currPage={this.state.route} loadAcc={this.loadAcc}/>
          <SignIn onRouteChange={this.onRouteChange} updateIsSignedIn={this.updateIsSignedIn} loadAcc={this.loadAcc}/>
        </div>}

        {this.state.route === routeOptions.Register && <div>
          <Navigation onRouteChange={this.onRouteChange} currPage={this.state.route}/>
          <RegisterPage onRouteChange={this.onRouteChange} loadAcc={this.loadAcc}/>
        </div>}

        {this.state.route === routeOptions.HomeApp && <div>
          <Navigation onRouteChange={this.onRouteChange} currPage={this.state.route} loadAcc={this.loadAcc}/>
          <Logo />
          <Rank numEntries={this.state.user.entries} name={this.state.user.name}/>
          <ImageLinkForm onInputchange={this.onInputchange} onButtonSubmit={this.onButtonSubmit2} />
          <FaceDetector boxes={this.state.boundingBoxesInfo} inputIMG={this.state.imageURL}/>
        </div>}
        
      </div>
    )
  }
}

export default App
