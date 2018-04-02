import React from 'react';
import Notification from '../Notification/Notification';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      notification: {
        show: false,
        text: ''
      }
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  // submit also on pressing enter from email or password
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitSignIn();
    }
  }

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state;

    // show notification on empty e-mail or password and return
    if (!signInEmail || !signInPassword) {
      this.setState({notification: {
        show: true,
        text: 'Empty e-mail or password!'
      }});
      return;
    }

    // hide notification
    this.onNotificationClick();

    fetch('https://murmuring-badlands-89925.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        // show notification on e-mail or password
        this.setState({notification: {
          show: true,
          text: 'Incorrect e-mail or password!'
        }});

      }
    })
    .catch(err => {
      if (err.name === "TypeError") {
        // show notification on network error
        this.setState({notification: {
          show: true,
          text: 'Network error occured. Try again later.'
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

	render () {
    const { onRouteChange } = this.props;
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
        				<legend className="f1 fw6 ph0 mh0">Sign in</legend>
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
                    autoFocus="autofocus"
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
        			<div>
          			<input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
        			</div>
        			<div className="lh-copy mt3">
          			<p
                  onClick={() => onRouteChange('register')}
                  className="f6 link dim black db pointer">
                  Register
                </p>
        			</div>
      			</div>
    			</main>
    		</article>
      </div>
    );
	}
}

export default Signin;