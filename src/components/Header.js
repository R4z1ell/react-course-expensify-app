import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

/* Here below we're taking the 'props' argument(which is the FIRST one) and DESTRUCTURE it for 'startLogout',
in this way we DIRECTLY pass it INSIDE the 'onClick' handler we're using for the 'button' element below */
export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    {/* The 'NavLink' is just another Component(of 'react-router-dom') that is SIMILAR to the 'Link' Component,
    it has ALL the features of 'Link'(so it give us 'Client Side Routing') but it ALSO have a series of other 
    FEATURES like for example the 'activeClassName', this property ALLOW us to APPLY styling JUST for these
    'NavLink', the 'exact' property instead is the SAME we used for the 'Route' Component of 'react-router-dom'
    so by adding it and specifying the TRUE value we're saying that we want to APPLY the style ONLY when we're
    actually on THAT page, so in this case when we're on the ROOT Page we'll the styling that we've specified(in 
    our case we've just made the link BOLD) BUT when we're on ANOTHER page that is NOT the ROOT page we will NOT
    see the BOLD style applied on this 'Dashboard' TEXT */}
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
