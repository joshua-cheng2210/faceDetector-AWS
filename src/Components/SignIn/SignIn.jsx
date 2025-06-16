import React from 'react';
import PropTypes from 'prop-types';
import { routeOptions } from '../../constants';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (event) => {
    // console.log("this.state.email: ", this.state.email)
    // console.log("this.state.password: ", this.state.password)
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    // console.log("this.state.email: ", this.state.email)
    // console.log("this.state.password: ", this.state.password)
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    // console.log("this.state.email: ", this.state.email)
    // console.log("this.state.password: ", this.state.password)
    event.preventDefault(); // Prevent the default form submission behavior
    const { onRouteChange, updateIsSignedIn, loadAcc } = this.props;
    // Perform sign-in logic here, e.g., validate credentials
    fetch("https://facedetector-backend.onrender.com/signin", {
      method : "post",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log("signin data: ", data)
      if (data !== "login failed"){
        // const {login, userX} = data
        loadAcc(data)
        updateIsSignedIn()
        onRouteChange(routeOptions.HomeApp)
      }
    })
  }

  render() {
    // const { onRouteChange, updateIsSignedIn } = this.props;
    const { email, password } = this.state;
    return (
      <div className="flex items-center justify-center vh-50 ">
        <form 
          className="pa4 br3 shadow-1"
          style={{ minWidth: '50%', minHeight: 'auto'}}
          onSubmit={this.handleSubmit} // Use onSubmit to handle form submission
        >
          <h2 className="f3 fw6 ph0 mh0 tc">Sign In</h2>
          {/* input email */}
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 bw2 hover-white hover-bg-black shadow-5"
              type="email"
              name="email-address"
              id="email-address"
              value={email}
              onChange={this.handleEmailChange}
              required
            />
          </div>
          {/* input pw */}
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="pa2 bw2 input-reset ba hover-white hover-bg-black bg-transparent w-100 shadow-5"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          {/* sign in submit button */}
          <div className="center">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="center">
            <p>don&apos;t have an account? Register here!</p>
          </div>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  loadAcc: PropTypes.func.isRequired,
  updateIsSignedIn: PropTypes.func.isRequired
};

export default SignIn;