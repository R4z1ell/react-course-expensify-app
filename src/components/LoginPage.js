import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
);

// We're using 'mapDispatchToProps' because we WANT to DISPATCH 'startLogin'
const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
