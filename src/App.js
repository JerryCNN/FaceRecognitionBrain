import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey:'48cc1a66a00543f3900fdb3b438bad41'
})

const particleoptions = {
      particles: {
        number: {
          value:130,
          density:{
            enable:true,
            value_area:800
          }  
        },
        move: {
        enable:true,
        speed:6.5,
        direction:'none',
        random:false,
        straight:false,
      }
      },
      interactivity:{
            detect_on : 'window',
            events : {
              onhover : {
              enable:true,
              mode: 'repulse',
            },
              onclick : {
                enable: true,
                mode : 'push'
              }
            }
           
          },

}

class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      input :'',
      imageurl:'',
      box:{},
      route: 'signin',
      isSignedin: false
    }
  }


  CalculateFaceLocation = (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftcol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightcol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    }

  }

  displayfacebox = (box) => {
    this.setState({box: box})
  }

  Oninputchange = (event) => {
    this.setState({input:event.target.value})
    console.log(this.state.input)
  }

  onButtonSubmit = () => {
    this.setState({imageurl:this.state.input})
    
    app.models.predict( 

      Clarifai.FACE_DETECT_MODEL,
      this.state.input)

    .then(response => this.displayfacebox(this.CalculateFaceLocation(response)))
    .catch(err => console.log(err))

  }

  onroutechange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedin: false})
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route:route})
  }


  render () {
    const {isSignedin, box , imageurl, route} = this.state
  return (
    <div className="App">
    <Particles className = 'Praticles'
    params = {particleoptions}
    />

      <Navigation isSignedin = {isSignedin} onroutechange = {this.onroutechange}/>
      { route === 'home'
        ? <div>
            <Logo />

            <Rank />

            <ImageLinkForm 
            Oninputchange = {this.Oninputchange}
            onButtonSubmit = {this.onButtonSubmit}
            />

            <FaceRecognition imageurl = {imageurl} box ={box}/>
          </div>

        : (
            route === 'signin'
            ? <Signin onroutechange = {this.onroutechange}/>
            : <Register onroutechange = {this.onroutechange}/>
          )
      }
    </div>
  );
}
}

export default App;
