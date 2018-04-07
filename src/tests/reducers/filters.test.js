import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should setup default filter values", () => {
  // This 'undefined' below refers to the DEFAULT 'state', so just the one we're using inside the 'toEqual'
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  // In this case we're using the 'toBe' method and NOT the 'toEqual' because we comparing a STRING
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    startDate: undefined, // For 'startDate' we're using 'undefined' because we DON'T care about its value
    endDate: undefined, // same here for 'endDate'
    sortBy: "amount" // what we care is 'sortBy', and we've changed its value from 'date'(the DEFAULT) to 'amount'
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "This is my filter";
  const action = {
    type: "SET_TEXT_FILTER",
    text
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test("should set startDate filter", () => {
  const startDate = moment();
  const action = {
    type: "SET_START_DATE",
    startDate
  };
  const state = filtersReducer(undefined, action);
  // We're using 'toEqual' because the value of 'startDate' is equal to 'moment()' so a "moment Object"
  expect(state.startDate).toEqual(startDate);
});

test("should set endDate filter", () => {
  const endDate = moment();
  const action = {
    type: "SET_END_DATE",
    endDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
