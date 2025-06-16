import React, { Component } from 'react'
import Tilt from 'react-parallax-tilt';
import logo from './logo.jpg';
import './Logo.css';
export class Logo extends Component {
  render() {
    return (
      <div className="ma4 mt0">
        <Tilt className="br4 Tilt">
          <div >
            <img src={logo} className="Tilt-inner logo-img" alt="logo" ></img>
          </div>
        </Tilt>
      </div>
    )
  }
}

export default Logo
