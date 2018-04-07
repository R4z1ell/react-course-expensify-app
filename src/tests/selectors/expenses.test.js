import moment from "moment";
import selectExpenses from "../../selectors/expenses";
import expenses from "../fixtures/expenses";

test("should filter by text value", () => {
  const filters = {
    text: "e",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test("should filter by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).add(1, "days")
  };
  const result = selectExpenses(expenses, filters);
  /* We've defined the 'endDate' property here above equal to 'moment(0).add(1, "days")', meaning that the 
  'endDate' will be 1 day AFTER the 'moment(0)'(that is the 1st January of 1970 at midning), so 1 day AFTER the
  1st January. Now in our 'expenses' TEST Array at the top of this file we're going to FILTER it based on this
  'endDate', so the filter should remove ANY item that it's been created AFTER this 'endDate' value, and inside
  our 'expenses' Array the ONLY item that it's been creater AFTER is the THIRD item(so the 'expenses[2]' item
  pretty much), so this item will be REMOVED. Now we will display ONLY the other TWO items and because we're
  sorting them by 'date'(the 'sortBy' property is equal to 'date' as we can see from inside the 'filters' Object,
  so the ORDER should be '[expenses[0]' FIRST and then '[expenses[1]' just like below */
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  /* The order in which these objects come back goes from the LAST item created until the FIRST item created, so
  in a DESCENDING Date order */
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
