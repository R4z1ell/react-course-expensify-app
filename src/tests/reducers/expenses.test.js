import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  // The '@@INIT" is just the the DEFAULT action defined inside the REDUX DEV Tool in the Chrome
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    /* Here we've refering to the SECOND Item inside the 'expenses' Array(so the Array we're importing above
    that contains our DUMMY Test Items) */
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1" // This time we're providing an 'id' that doest NOT exist inside the 'expenses' Dummy Test Array
  };
  const state = expensesReducer(expenses, action);
  // So we expect that the 'state' is EQUAL to the 'expenses' because NOTHING should have been removed from it
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "109",
    description: "Laptop",
    note: "",
    amount: 29500,
    createdAt: 20000
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  /* This 'state' below refer to NEW Array, so the OLD 'expenses' array where we pass in the NEWLY created 
  'expense' Item above, so NOW this new Array should have FOUR Items inside it */
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const amount = 122000;
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      amount
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test("should not edit an expense if expense not found", () => {
  const amount = 122000;
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      amount
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
