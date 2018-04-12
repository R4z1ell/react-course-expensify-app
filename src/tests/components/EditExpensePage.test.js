import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  // this 'shallow' function is just used to VIRTUALLY RENDER our Component
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense} // this 'editExpense' refers to the SPY we just STORED inside the 'editExpense'
      startRemoveExpense={startRemoveExpense} // this 'removeExpense' refers to the SPY we just STORED inside the 'removeExpense'
      history={history} // this 'history' refers to the SPY we STORED inside the 'push' property above
      /* We ALSO need to pass down an ACTUAL 'expense'(so a REAL data pretty much, this is why we IMPORTED our
      DUMMY Test Data 'expenses' above,so just to be able to USE them here) and THAT need to happen via the
      'expense' PROPERTY. We HAVE to pass this DATA because INSIDE the TWO methods of the 'EditExpensePage' 
      Component('onSubmit' and 'onRemove') we're actually using 'this.props.expense.id' so we NEED a way to pass
      this DATA and we're doing it by SETTING this 'expense' ATTRIBUTE and put it EQUAL to a REAL Data coming 
      from the 'expensens' Array, so our DUMMY Test Data Array. So by using this code below we're just making
      sure to PASS some REAL data so that when THOSE methods gets used they CAN access the data they NEED(the 'id'
      in this case) */
      expense={expenses[2]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test("should handle startRemoveExpense", () => {
  /* In THIS case we DON'T need to add the actual CALL(so we don't have to add '.simulate("click")(expenses[2])' 
  like we're doing for the test ABOVE) because the 'onRemove' method(that is the method that gets FIRED when we 
  CLICK the button) DOESN'T take ANY arguments */
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  /* Just NOTE that the ITEM we're passing inside the 'id' property HAVE to be EXACTLY the 'expenses[2]' because
  THAT is the item we've DEFINED inside the 'beforeEach' Function above for the 'expense' ATTRIBUTE, so when we
  need to provide the ACTUAL data we HAVE to pass THIS exact item for ALL our test, so we're not just picking
  this item RANDOMLY but it HAS to be the 'expense[2]' item. If we want to TEST passing ANOTHER item we have to
  FIRST edit the 'expense' ATTRIBUTE of the 'EditExpensePage' Component INSIDE the 'beforeEach' above and THEN
  we could change it to THAT item inside our TESTS */
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
