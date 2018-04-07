import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;

/* This 'beforeEach' is a JEST Method that runs a Function before EACH of the test we've defined in THIS file.
In our case we're using the 'beforeEach' to DEFINE the THREE variables above here(so 'onSubmit', 'history' and
'wrapper') that we use in MORE places inside our TESTS, so by using the 'beforeEach' we DON'T have to REWRITE
the SAME code over and over again in ALL the tests that NEEDS those variables */
beforeEach(() => {
  addExpense = jest.fn(); // Here we've created this 'onSubmit' SPY
  history = { push: jest.fn() }; // Here we've created ANOTHER Spy and stored it INSIDE the 'push' property
  wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
