import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});

test("should correctly add up a single expense", () => {
  const res = selectExpensesTotal([expenses[0]]);
  expect(res).toBe(195);
});

test("should correctly add up multiple expenses", () => {
  const res = selectExpensesTotal(expenses);
  /* This '114195' is the TOTAL sum of EACH 'amount' property of EACH item INSIDE the 'expenses' Array we're
    importing above, so pretty much "expenses[0].amount + expenses[1].amount + expenses[2].amount" */
  expect(res).toBe(114195);
});
