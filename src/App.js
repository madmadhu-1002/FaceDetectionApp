import './App.css';
import React from 'react';
//import Clarifai from 'clarifai'
import Navigation from './components/Nav/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import properti from './constants.';

// const app = new Clarifai.App({
//   apiKey: '3008a44dd4cf43158db4a56dce637db2'
//  });



 ///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
var PAT = '261b2d5e4d0a42868e4d9e2ab731e683';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
var USER_ID = 'mahidharkosigi';       
var APP_ID = 'mahidharkosigi';
// Change these to whatever model and image URL you want to use
var MODEL_ID = 'face-detection';
var MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    


///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////






    

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id



 

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input : '',
      imageUrl: '',
      box: {}
      
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input}, () => {
      
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": this.state.imageUrl
                      }
                  }
              }
          ]
      })
    })
      .then(response => response.text())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error))
    }
    )
    }
   

    //.outputs[0].data.regions[0].region_info.bounding_box
   
  render(){
    const particlesInit = async (main) => {
      console.log(main);
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      <div>
      <Particles
      id="tsparticles"
      init={particlesInit}
      options={properti}
    />
    </div>
    <div>
    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
    </div>
      
  );
}
}
export default App;
