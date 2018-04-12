import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";

const store = configureStore();

const jsx = (
  /* This 'Provider' Component(coming from the 'react-redux' library) is going to allow us to PROVIDE the 'store'
  to ALL the Components that make up our application, this is a SUPER useful features, it means that we do NOT
  need to MANUALLY pass the 'store' around INSTEAD individual Components that WANT to access the store can just
  access it. In this component we HAVE to pass a single property that is the STORE that we're trying to SHARE
  with the rest of our Application, the property name is 'store' and we HAVE to set it equal to OUR Redux
  'store', in our case we have our store inside the 'store' variable above so we just reference it */
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

/* This 'onAuthStateChanged' method below takes a CALLBACK Function as first Argument and it RUNS this Callback
when the AUTHENTICATION status CHANGE, so when a User goes from unauthenticated to authenticated OR from
authenticated to unauthenticated and we PROVIDE the 'user' as the Argument for the CALLBACK. So pretty much
this 'onAuthStateChanged' Function allowed us to to run this 'if-else' statement EVERY single time the
"Authentication State" CHANGED including the FIRST time we load the Application */
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    /* Here below we're DISPATCHING the 'login' Action and passing inside it the 'user.uid'(a UNIQUE IDENTIFIER
    that is AVAILABLE on the 'user' property, this 'uid' is UNIQUE to our Firebase Application) */
    store.dispatch(login(user.uid));
    // 'startSetExpenses' is going to return a PROMISE and this is why we can ATTACH onto it the 'then' method
    store.dispatch(startSetExpenses()).then(() => {
      /* When our ASYNCHRONOUS 'startSetExpenses' ACTION it's DONE, so ONLY when this Action complete SUCCESSFULLY,
      we're going to actually RENDER our Application by calling this 'renderApp' Function */
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
