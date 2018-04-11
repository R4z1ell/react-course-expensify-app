// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      // The 'filter' method will create a NEW Array, so again we are not going to MANIPULATE the original 'state'
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        /* 'expense.id' refers to the ITEM/S we currently have INSIDE the 'state', instead 'action.id' refers to
        the ITEM we want to edit(in our case is expenseTwo) */
        if (expense.id === action.id) {
          return {
            /* this '...expense' is pretty much EQUAL to '...state'. So here we're returning a NEW Object where
            we take ALL the properties of 'expense'(so ALL the properties of our PREVIOUS 'state') and we want
            to OVERRIDE the properties that we're passing INSIDE the 'action.updates', in our case the ONLY one
            we're passing is the 'amount: 500' SO we're just going to CHANGE that property and MODIFY its value
            to 500, as we can see we're using the SPREAD OPERATOR on 'action.updates' because it is actually an
            Object(we're passing '{ amount: 500 }') */
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    case "SET_EXPENSES":
      return action.expenses;
    default:
      return state;
  }
};
