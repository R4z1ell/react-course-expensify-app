import React from "react";
import moment from "moment";
// This 'react-dates' is a "CALENDAR Picker" that require the 'moment' library
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* For these FOUR properties('description', 'note', 'amount' and 'createdAt') we're going to use the DEFAULT
      values(so the code that we have AFTER the ':' in the ternary Operator for EACH of these properties) ONLY if 
      the 'props.expense' is FALSE(so when we're NOT passing down an 'expense'), and this is going to make sure
      that the 'AddExpensePage' Component STILL works fine when we DON'T pass an 'expense' HERE. BUT when we 
      actually pass down an 'expense'(so when the user is actually ADDING Valid data e sending them) we want to 
      use THOSE values INSTEAD of the default values(pretty much we want to POPULATE the 'EditExpensePage' where 
      we're RENDERING this 'ExpenseForm' Component with the CURRENT values of the 'expense', so we want to see 
      EACH input(the 'description' 'note' and so on) FILLED with the REAL value, and NOT have just an EMPTY input) 
      and in ORDER to POPULATE those inputs with the REAL values we NEED to access to the 'props' property and 
      CURRENTLY there is NO WAY to do that with the PREVIOUS syntax(the one where we were using just the NORMAL 
      'state' declaration, so WITHOUT using the 'constructor' Function pretty much). So to have ACCESS to the
      'props' we NEED to define the 'state' INSIDE the 'constructor' Function(so just like we're doing NOW) */
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      // 'props.expense.amount' is a NUMBER but we want it to be a STRING, so we use the 'toString' method
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value;

    /* This 'match' below is a JavaScript METHOD that searches if a String(what the user types pretty much) does
    match the REGULAR EXPRESSION we're providing INSIDE the 'match' method itself, in our case ONLY if we've a 
    MATCH or there is NO 'amount'(the '!amount' code let the User CLEAR the value) we're going to UPDATE our 
    'state' */
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = e => {
    e.preventDefault();

    /* If the User tries to SUBMIT this form WITHOUT adding a valid 'description' OR a valid 'amount', we'll 
    throw back this ERROR below */
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      /* The 'this.props.onSubmit' below is a property COMING from the PARENT Component, so the Components that
      are actually USING this 'ExpenseForm' Component(that is the CHILD Component in this case), and they are the 
      'AddExpensePage' and 'EditExpensePage' Components. So in THIS case what we're doing is the following, when
      we CLICK the 'Add Expense' button(the one we have HERE below inside the FORM itself) we FIRE the 'onSubmit'
      method(so EXACTLY this method where we are in right now), and here we just CHECK if the User has ACTUALLY
      added a 'description' and 'amount', in THAT case we pass ALL the data that we've INSIDE 'this.props.onSubmit'
      here below to the PARENT component(precisely we're passing our data to the INSTANCE of THIS 'ExpenseForm'
      Component that we're unsing in the PARENT 'EditExpense' Component) where they get STORED inside the 
      'expense'(so the FIRST argument of the CALLBACK pretty much), and it's THERE, so inside ONE of the two 
      PARENT components that we actually DISPATCH the action to the 'store' from the INSTANCE of THIS Component, 
      HERE we're ONLY passing the data from THIS 'ExpenseForm' CHILD Component to its INSTANCE used inside the
      PARENT Component */
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        /* The VALUE of the 'this.state.createdAt' property is currenty an OBJECT(because THAT is what gets
        returned from the 'moment()' Function) BUT we want a NUMBER and not an Object, so we can use this
        'valueOf' method(it's a 'moment' function) that will CONVERT the Object INTO a Number for us */
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          /* With this code below added, EVERY single day in the past is NOW available for being selected 
            inside the CALENDAR given to us by the 'react-dates' Library, so now we can pick ANY date in the
            PAST(by default, so when we DON'T have this code below this was NOT possible) */
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          /* We HAVE to add this 'onChange' below OTHERWISE we have a READ ONLY 'taxtarea' and when we type
            inside of if NOTHING will change */
          onChange={this.onNoteChange}
        />
        <div>
          {/* Here below we're putting this 'button' element INSIDE this 'div' so that the 'button is NOT anymore
          a DIRECT CHILD of the 'form' element, in THIS way our STYLE we defined in the '_form.scss' file we'll
          NOT target this 'button' element because by putting him INSIDE this 'div' we're REMOVED it from being
          a DIRECT CHILD of the 'form'. This becase we DON'T want this 'button' to be a FLEX Item and also we
          want to apply this 'button' class to him */}
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
