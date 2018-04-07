import { createStore, combineReducers } from "redux";
import uuid from "uuid"; // A package that creates RANDOM Unique Id(we're going to use it until we add a Database)

// ADD_EXPENSE

/* Here below we're just DESTRUCTURING the 'expenses' Object and assigning to EACH of these property below a 
DEFAULT value */
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT_BY_DATE

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE

const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

// SET_END_DATE

const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
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
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return (
    expenses
      .filter(expense => {
        const startDateMatch =
          /* If 'startDate' is UNDEFINED(and THAT is actually his DEFAULT value because we define it like that inside
    the 'filtersReducerDefaultState') the code 'typeof startDate !== "number"' will return TRUE and in that case
    we're NOT going to FILTER anything, so when 'startDate' is UNDEFINED it will have NO EFFECT on whether or not
    an 'expense'(so an Item from our 'state' Array) is VISIBLE. ONLY if 'startDate' is a NUMBER we want to actually
    FILTER the 'expenses' Array. Let's now conside a DUMMY example, let's say that 'startDate' is UNDEFINED and
    'createdAt' is 1, in this case the code 'typeof startDate !== "number"' will result in TRUE so the variable
    'startDateMatch' will have a value of TRUE and the Item WON'T be FILTERED, NOW let's say that 'startDate' is
    equal to 2 and 'createdAt' is 1, in THIS case the code 'typeof startDate !== "number"' will result in FALSE
    which means that the 'expense.createdAt >= startDate' code will RUN , so 'expense.createdAt' is equal to 1
    and 'startDate' is 2 SO this code will ALSO result in FALSE and the ITEM will be filtered OUT(so will NOT be
    included in the resulting ARRAY) */
          typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch =
          typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense.description
          .toLowerCase()
          .includes(text.toLowerCase());

        /* If ALL of the variables we defined above(so 'startDateMatch', 'endDateMatch' and 'textMatch') are TRUE then
    we have a COMPLETE match and we want to return TRUE from this expression below. So if ALL our three variables
    return TRUE the 'filter' function will return TRUE and the ITEM will be KEPT in the Array, INSTEAD if ANY of
    these Variables result FALSE then the WHOLE expression will return FALSE and the ITEM will be REMOVED from 
    the Array */
        return startDateMatch && endDateMatch && textMatch;
      })
      /* The Function we're passing INSIDE the 'sort' method is called "COMPARISON Function" which defines HOW 
      we're going to SORT base on the RETURNED value, this function takes TWO arguments(usually referred to as 
      'a' and 'b') which represent the two values being compared in EACH operation. IF the function returns a 
      value LESS than zero, we sort 'a' BEFORE 'b', IF the function returns a value GREATER than zero, we sort
      'b' BEFORE 'a', IF the function retuns ZERO we LEAVE 'a' and 'b' UNCHANGED, so we DON'T touch their order */
      .sort((a, b) => {
        if (sortBy === "date") {
          /* If 'a.createdAt < b.createdAt' is TRUE we'll return '1', meaning that 'b' will have a LOWER 'index' than
      'a', so 'b' will come FIRST than 'a' in the Array, INSTEAD if the code return FALSE then we'll return '-1' 
      and 'a' will come FIRST than 'b' in the Array */
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === "amount") {
          // 1 = 'b' coming FIRST, -1 = 'a' coming FIRST
          return a.amount < b.amount ? 1 : -1;
        }
      })
  );
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter(""));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
  expenses: [
    {
      id: "pjooasdodkweekrw",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
