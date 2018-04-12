import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

/* Here below we're creating our very first ASYNCHRONOUS ACTION, where INSTEAD of returning an OBJECT(our 
Action pretty much) we're returning a FUNCTION, and THIS Function is ONLY going to actually work because we
set up the Middleware for 'redux-thunk', by DEFAULT trying to do something like this would NOT work. Now this
Function gets called INTERNALLY by Redux with DISPATCH(so we're passing 'dispatch' as FIRST argument inside
the returning Function pretty much) and this will give us ACCESS to 'dispatch' AFTER we've actually DONE with
the code INSIDE this Function. In our case we're writing some Data INSIDE the Firebase Database and WAITING for
THAT Data to CORRECTLY sync and THEN we'll DISPATCH 'addExpense' making sure that the Redux STORE actually
reflects those CHANGES as well. We know that if we want to SAVE something inside Firebase we NEED to RESTRUCTURE
our Data(because by DEFAULT Firebase DOESN'T accepts ARRAY) */
export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    /* Here below we're using DECONSTRUCTURING to define the DEFAULT values for EACH of the properties(in case 
    the User doesn't add them for whatever reason) */
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    /* And here we're ASSIGNING at these property below the SAME values as above using the ES6 shorhand Syntax,
    so description: description, note: note and so on. THEN we're using THIS 'expense' variable BELOW to actually
    STORE these values into our Database */
    const expense = { description, note, amount, createdAt };

    return (
      database
        .ref("expenses")
        // This 'expense' we're pushing refers to 'expense' variable we just created here above
        .push(expense)
        /* The 'push' method return a 'firebase.database.ThenableReference' which is DEFINED as a COMBINED Promise
      and Reference. Since it's a "Thenable" we can ATTACH on the 'push' method a 'then' method ans since is
      ALSO a "Reference" THAT is what we're going to PASS as FIRST Argument inside the 'then' method below(so 
      we're passing the 'ref', the reference) */
        .then(ref => {
          /* Here we're finally DISPATCHING the 'addExpense' Action we have above, otherwise the REDUX 'store' is
        NEVER going to CHANGE */
          dispatch(
            addExpense({
              id: ref.key,
              // Here we're just passing ALL the properties of the 'expense' const we just created above
              ...expense
            })
          );
        })
    );
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        /* When the 'expense' it's been successfully REMOVED, we can then actually DISPATCH this 'removeExpense'
        Action Generator that will UPDATE our Redux 'store' */
        dispatch(removeExpense({ id }));
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates = {}) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

/* This 'startSetExpenses' below is our ASYNCHRONOUS ACTION that fetches our Data from the Database and put
ALL this Data inside our Redux 'store'(this last part, so the actual DISPATCH to the Redux 'store' happens 
inside the 'app.js' file) */
export const startSetExpenses = () => {
  return dispatch => {
    /* By adding this 'return' below we're making sure that the PROMISE actually gets RETURNED and THIS is 
    what is going to allow us to have access to the 'then' method we're chaining on this 'startSetExpenses'
    INSIDE the 'app.js' File where we actually DISPATCH */
    return database
      .ref("expenses")
      .once("value")
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setExpenses(expenses));
      });
  };
};
