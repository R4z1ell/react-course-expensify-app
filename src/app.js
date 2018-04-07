import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 4500 }));
store.dispatch(addExpense({ description: "Gas bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "Rent", amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

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

ReactDOM.render(jsx, document.getElementById("app"));
