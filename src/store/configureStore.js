// This 'applyMiddleware' we're importing below allow us to USE Middleware(are just Functions) inside our STORE
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
/* This 'thunk' we importing from the 'redux-thunk' Library is a MIDDLEWARE that allows us to write Action
Creators that return a FUNCTION instead of an Action, by DEFAULT we CAN'T do this in Redux(so we CAN'T return
a Function from an Action Creator) and THIS is the reason we're using this 'redux-thunk' package that will 
allow us to do EXACTLY this */
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
