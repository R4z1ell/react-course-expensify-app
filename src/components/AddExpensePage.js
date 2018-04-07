import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    // The 'this.props.addExpense(expense)' below refers to the 'addExpense' INSIDE the 'mapDispatchToProps'
    this.props.addExpense(expense);
    /* This code will REDIRECT us to the MAIN Page after we've submitted the FORM, so after we've clicked 
    the 'Add Expense' button we will be redirect to the ROOT('/') page WITHOUT any Browser REFRESH because
    we're going to use CLIENT Routing. We've already seen that ALL the Components that gets rendered through
    the React 'Route' Component have access to a bunch of SPECIAL 'props', and ONE of these 'props' is the
    'history' Object where inside we have a LOT of methods that we can use, and ONE of these methods is this
    'push' method that we're using here below that will REDIRECT us to the Root Page after we're dispatched
    our 'addExpense' action */
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

/* This 'mapDispatchToProps' below is pretty SIMILAR to 'mapStateToProps' BUT instead of working with the 'state'
we're dealing with DISPATCH. So NOW that we've created this 'addExpense' property we can CHANGE the previous code
'props.dispatch(addExpense(expense))' we were using until now and CHANGE it into 'props.addExpense(expense)' that
is WAY MORE simple to TEST. So we've used this method ONLY to facilitate our TESTING. The 'mapDispatchToProps'
(that get passed in as SECOND argument for the 'connect' REDUX Function below) is the WAY that REDUX provides
to THIS 'AddExpensePage' Component to EASILY pass the 'addExpense' Function INTO his WRAPPED Component(so the
'ExpenseForm' Component) as a 'prop' */
const mapDispatchToProps = dispatch => ({
  // Just notice that we're IMPLICITLY returning an Object
  addExpense: expense => dispatch(addExpense(expense))
});

/* In this case we're NOT passing inside the 'mapStateToProps' Function INSIDE the 'connect' because we DON'T
need to take ANYTHING from the 'state', so we just call 'connect()' WITHOUT passing in anything and this is a 
perfectly VALID usage of 'connect', which means that in THIS case we DON'T get ANY values back from the 'state'
BUT we have still access to the 'dispatch' property that is WHAT we NEED in this case. So with this SYNTAX below
we don't take ANYTHING from the 'state' BUT because we're CONNECTING to the Redux 'store' we have ACCESS to the
'dispatch' property, these because in THIS case we ONLY need to WRITE onto the 'store' and we DON'T need to
READ anything from it, this is the reason whe we don't need to use the 'mapStateToProps' Function */
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
