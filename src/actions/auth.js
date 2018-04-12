import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const startLogin = () => {
  return () => {
    /* With this code below we're pretty much saying "Hey we want to go ahead an SIGN IN to one of our accounts
    and we're going to use the POPUP System(so when we CLICK on the 'Login' BUTTON we'll see that a NEW browser 
    page SHOW UP and inside this new page we can LOGIN using a Google Account pretty much) and we WANT to LOG 
    IN with the Google related SERVICES" */
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  // Here we're conforming to the 'redux-thunk' spec by returning a Function INSIDE another Function
  return () => {
    // Here we use this 'return' keyword to continue the PROMISE CHAIN
    return firebase.auth().signOut();
  };
};
