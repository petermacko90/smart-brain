import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Notification from './components/Notification/Notification';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  faces: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  notification: {
    show: false,
    text: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faces = data.outputs[0].data.regions;
    let faceBoxes = [];

    for (let i = 0, l = faces.length; i < l; i++) {
      let face = faces[i].region_info.bounding_box;
      faceBoxes[i] = {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    }
    return faceBoxes;
  }

  displayFaceBox = (faces) => {
    this.setState({faces: faces});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    // show notification on empty input and return
    if (!this.state.input) {
      this.setState({notification: {
        show: true,
        text: 'Empty input!'
      }});
      return;
    }

    // hide notification
    this.onNotificationClick();

    this.setState({imageUrl: this.state.input});
    fetch('https://murmuring-badlands-89925.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      // only increase entry count in case of correct image url
      if (response !== 'unable to work with api') {
        fetch('https://murmuring-badlands-89925.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
      }

      if (Object.keys(response.outputs[0].data).length === 0) {
        // show notification no faces found
        this.setState({notification: {
          show: true,
          text: 'No faces found!'
        }});

      } else {
        this.displayFaceBox(this.calculateFaceLocation(response));
      }
    })
    .catch(err => {
      // show notification on incorrect input
      this.setState({notification: {
        show: true,
        text: 'Incorrect image URL!'
      }});

    });
  }

  onRouteChange = (route) => {
  	if (route === 'signout') {
  		this.setState(initialState);
  	} else if (route === 'home') {
  		this.setState({isSignedIn: true});
  	}
    this.setState({route: route});
  }

  // hide notification on click
  onNotificationClick = () => {
    this.setState({notification: {
      show: false,
      text: ''
    }});
  }

  render() {
  	const { isSignedIn, imageUrl, route, faces } = this.state;
    return (
      <div className="App">
        {this.state.notification.show ? 
          <Notification
            text={this.state.notification.text}
            onClick={this.onNotificationClick}
          />
          : null
        }
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ?
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition faces={faces} imageUrl={imageUrl} />
          </div>
        :
          (route === 'signin' || route === 'signout' ?
          	<Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          :
          	<Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )
        }
      </div>
    );
  }
}

export default App;