import React from 'react';
import Notification from '../Notification/Notification';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      notification: {
        show: false,
        text: ''
      }
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  // submit also on pressing enter from name, email or password
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitSignIn();
    }
  }

  onSubmitSignIn = () => {
    const { email, password, name } = this.state;

    // show notification on empty e-mail, password or name and return
    if (!email || !password || !name) {
      this.setState({notification: {
        show: true,
        text: 'Empty name, e-mail or password!'
      }});
      return;
    }

    // hide notification
    this.onNotificationClick();

    fetch('https://murmuring-badlands-89925.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          // show notification
          this.setState({notification: {
            show: true,
            text: 'E-mail already exists!'
          }});

        }
      });
  }

  // hide notification on click
  onNotificationClick = () => {
    this.setState({notification: {
      show: false,
      text: ''
    }});
  }

  render() {
  	return (
      <div>
        {this.state.notification.show ?
          <Notification
            text={this.state.notification.text}
            onClick={this.onNotificationClick}
          />
        : null}
    		<article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    			<main className="pa4 black-80">
      			<div className="measure">
        			<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        				<legend className="f1 fw6 ph0 mh0">Register</legend>
        				<div className="mt3">
          				<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
          				<input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                    onKeyPress={this.handleKeyPress}
                    autoFocus="autofocus"
                  />
        				</div>
        				<div className="mt3">
          				<label
                    className="db fw6 lh-copy f6"
                    htmlFor="email-address">
                    E-mail
                  </label>
          				<input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                    onKeyPress={this.handleKeyPress}
                  />
        				</div>
        				<div className="mv3">
          				<label
                    className="db fw6 lh-copy f6"
                    htmlFor="password">
                    Password
                  </label>
          				<input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    onKeyPress={this.handleKeyPress}
                  />
        				</div>
        			</fieldset>
        			<div className="">
          			<input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
        			</div>
      			</div>
    			</main>
    		</article>
      </div>
  	);
  }
}

export default Register;