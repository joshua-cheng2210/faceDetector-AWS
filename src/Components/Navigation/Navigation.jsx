import React from 'react';
import {routeOptions} from '../../constants'
import PropTypes from 'prop-types';

function Navigation({onRouteChange, currPage, loadAcc}) {
  return (
    <div>
        <nav style={{display: 'flex', justifyContent: "flex-end"}}>
          {
            currPage === routeOptions.HomeApp ? (
              <p className="f3 link black dim underline pointer pa3" onClick={() => {
                onRouteChange(routeOptions.SignIn); 
                loadAcc({})
              }}>Sign out</p>
            ) : currPage === routeOptions.SignIn ? (
              <p className="f3 link black dim underline pointer pa3" onClick={() => onRouteChange(routeOptions.Register)}>Register</p>
            ) : currPage === routeOptions.Register ? (
              <p className="f3 link black dim underline pointer pa3" onClick={() => onRouteChange(routeOptions.SignIn)}>Sign in</p>
            ) : (
              <p className="f3 link black dim underline pointer pa3"></p>
            )            
          }
        </nav>
    </div>
)}

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  loadAcc: PropTypes.func,
  currPage: PropTypes.oneOf(Object.values(routeOptions)).isRequired,
};

export default Navigation
