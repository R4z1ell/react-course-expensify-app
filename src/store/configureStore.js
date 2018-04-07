import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    /* This code below is used to ACTIVATE the 'Redux Dev Tool Extension' we've just added on CHROME that will
    let use see our Redux 'store' INSIDE the Browser, this code NEEDS to be passed in as SECOND argument for the
    'createStore' Function */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
