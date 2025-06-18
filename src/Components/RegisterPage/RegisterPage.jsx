import React from 'react';
import PropTypes from 'prop-types';
import { routeOptions } from '../../constants';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const { onRouteChange, loadAcc } = this.props;
    // Perform registration logic here, e.g., send data to the server
    fetch("https://2zklg96udc.execute-api.us-east-1.amazonaws.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if (data === "unable to register"){
        return
      }
      loadAcc(data)
      onRouteChange(routeOptions.SignIn)
      // if (data["register"] === "success") {
      //   const {_, userX} = data
      //   loadAcc(userX)
      //   onRouteChange(routeOptions.SignIn);
      // }
    });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="flex items-center justify-center vh-50">
        <form 
          className="pa4 br3 shadow-1"
          style={{ minWidth: '50%', minHeight: 'auto'}}
          onSubmit={this.handleSubmit} // Use onSubmit to handle form submission
        >
          <h2 className="f3 fw6 ph0 mh0 tc">Registration</h2>
          {/* input name */}
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">
              Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 bw2 hover-white hover-bg-black shadow-5"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleNameChange}
              required
            />
          </div>
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
          {/* input password */}
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
          {/* register submit button */}
          <div className="center">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  loadAcc: PropTypes.func.isRequired,
};

export default RegisterPage;