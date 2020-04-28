import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "./Loader";

import Auth from './Auth/Auth';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, paymentMade },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      (!isAuthenticated && !loading ) || (isAuthenticated && !loading && paymentMade === false) ? (
        <Auth />
      ) : 
      loading ? 
      <Loader /> : 
      (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);