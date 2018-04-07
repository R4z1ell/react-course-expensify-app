import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    /* When we SET a Component INSIDE a 'Route'(so the 'Route' Component of 'react-router-dom') to be the VALUE of
  THAT Route, so to be the Component that gets RENDERED to the Screen when the User GOES on that page. On THAT 
  Component 'react-router' is PASSING some 'props' WITHOUT us knowing it, in this case from ALL the 'Route' that
  we have in place inside the 'AppRouter.js' File we've choose the '/edit' Route that will render to the screen
  this 'EditExpensePage' Component, so as we've seen 'react-router-dom' is passing some 'props' to THIS Component
  and we can ACCESS them to do something USEFUL for our Application, in this case we're just returning the
  DYNAMIC value of the 'id' that gets added in the URL(so for example if we visit the page '/edit/99' we'll see
  this 99 PRINTED to the screen in place of the 'props.match.params.id' code) */
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

/* THIS time we NEED to access to the 'state' because we want to be able to give at this 'EditExpensePage'
Component the ACCESS to the CURRENT 'expense' Object. So NOW that we have access to the 'state' what are we lookin 
for? Well we're searching the 'expenses' ARRAY for an 'expense' whose ID matches the id 'props.match.params.id', 
but HOW do we ACCESS it? We can access it through the 'props'(so we add 'props' as SECOND argument inside the 
'mapStateToProps') */
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: data => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
