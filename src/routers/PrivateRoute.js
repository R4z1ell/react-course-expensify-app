import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

/* The WHOLE point of using this 'PrivateRoute' Component was to WRAP our 'Route' Components and add some
conditional LOGIC(the logic we're using INSIDE the 'Route' Component here below) that will ALLOWS us to
determine if the 'user' is AUTHENTICATED or NOT */
export const PrivateRoute = ({
  isAuthenticated,
  /* This 'component' below is the PROPERTY we're passing inside ALL the 'PrivateRoute' Components we're using
  in the 'AppRouter.js' file, in this case though becase we KNOW that we're eventually going to RENDER them
  we're SETTING 'component' EQUAL to 'Component' so with the CAPITAL C letter */
  component: Component,
  /* With this '...rest' below contains ALL the other PROPERTIES that we HAVEN'T descrutured(so like the 'path'
  or the 'exact' properties) and THEN we're passing ALL of them INSIDE the 'Route' Component HERE below. This
  'rest' name is ONLY something that WE decided, we could have named it like WE WANT. We're doing this so that
  ONLY our 'PrivateRoute' Components have ACCESS to the 'isAuthenticated' PROPERTY, for ALL the simple 'Route'
  Component we DON'T need to pass it because those Routes are PUBLIC */
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          {/* So NOW we'll have the 'Header' Component showing up ONLY on our 'PrivateRoute' Components */}
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

// We have to define 'mapStateToProps' because we NEED to know if the 'user' is AUTHENTICATED or NOT
const mapStateToProps = state => ({
  /* By using the DOUBLE !! notation we'll return TRUE if we ARE Authenticated(because !!"19121121900" => TRUE,
  i've just added a RANDOM number to represent the 'uid') and FALSE if we are NOT(because !!undefined =>  FALSE) */
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
