import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

/* The WHOLE point of using this 'PrivateRoute' Component was to WRAP our 'Route' Components and add some
conditional LOGIC(the logic we're using INSIDE the 'Route' Component here below) that will ALLOWS us to
determine if the 'user' is AUTHENTICATED or NOT. A thing to note is that this 'PrivateRoute' is an HOC(so an
HIGH ORDER COMPONENT) because it TAKES IN a Component and returns a NEW Component */
export const PrivateRoute = ({
  isAuthenticated,
  /* This 'component' below refers to the 'component' property that we're passing inside ALL the 'PrivateRoute' 
  Components we're using in the 'AppRouter.js' file, in this case though becase we KNOW that we're eventually 
  going to RENDER them we're SETTING THIS 'component' below EQUAL to 'Component' so with the CAPITAL C letter */
  component: Component,
  /* This '...rest' below contains ALL the other PROPERTIES that we HAVEN'T descrutured(so like the 'path'
  or the 'exact' properties) and THEN we're passing ALL of them INSIDE the 'Route' Component HERE below. This
  'rest' name is only something that WE decided, we could have named it like WE WANT */
  ...rest
}) => (
  <Route
    /* To make sure that ALL the '...rest' PROPERTIES we've defined ABOVE gets passed DOWN here in this 'Route' 
    Component we NEED to ALSO add them and for this exact reason we've added this '{...rest}' code below */
    {...rest}
    /* We NEED to pass this 'props' below so that this 'Route' Component gets ACCESS to the 'match', 'history' 
    and 'location' props. Also THIS 'component' property here below REFERS to the 'component' property ABOVE
    so where we have 'component: Component' and we NEEDED to ADD it here becase as we KNOW this 'component'
    property was NOT provided INSIDE the '{...rest}' properties ABOVE, because there we have ALL the properties
    EXEPT for 'isAuthenticated' and 'component' so for THIS reason we're MANUALLY adding 'component' here below */
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
