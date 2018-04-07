import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div>
    {/* This 'props.expenses' below is coming from the 'mapStateToProps' */}
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
  </div>
);

/* Every time the data inside our 'store' CHANGE this 'mapStateToProps' Function will AUTOMATICALLY rerun and
will get the FRESH value from the 'store' and will put them INSIDE our Component. So it's important to know 
that when we CONNECT a Component to the Redux 'store' the Component itself become REACTIVE, meaning that as the 
'store' CHANGES our Component is going to get RE-RENDERED with those NEW values. As we can see from below we
have DIRECT access the 'state' without the need to import ANYTHING and THIS is exaclty what 'react-redux' does
for us, it provides a GLOBAL 'store' for our STATE in which ANY Component, no matter how DEEPLY nested it is,
can CONNECT to it. ANY Component that uses the 'connect' Function has ACCESS to the Application CURRENT 'state'
*/
const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

/* When we CALL the 'connect' Function(the one coming from the 'react-redux' library) what we get BACK from it 
is NOT an "High Order Component" BUT it's actually a Function and it's THAT Function that we NEED to call with 
the 'ExpenseList' Component. INSIDE the 'connect' function itself we PROVIDE the Information about WHAT we want 
to CONNECT and we provide this information with ANOTHER Function that let us DETERMINE what information from the 
'store' we want our Component to be able to ACCESS. So pretty much this 'mapStateToProps' define the THINGS that
we we want to GET off of the 'store' and the 'ExpenseList' is a COPY of the original 'ExpenseList' Component 
where we have a bunch of NEW property(the 'props') INSERTED onto it */
export default connect(mapStateToProps)(ExpenseList);
