import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
  /* This 'ExpenseForm' DOES take an OPTIONAL 'expense' PROPERTY if we want to edit EXISTING values BUT for now
  we're just going to TEST this Component with the DEFAULT values so we DON'T have to pass ANY 'props'. As we
  already know the FIRST time we run a SNAPSHOT test it will ALWAYS pass because we DON'T have the actual file 
  when we run the test for the FIRST time. The SECOND time though we WOULD already have the SNAPSHOT file BUT
  in THIS case we would expect the test to ACTUALLY pass EVEN the second time we run the test BUT in this case
  the test will NOT pass. The problem in our case is that inside the 'ExpenseForm' Component we have a property
  named 'createAt' whose values is 'moment()', so we're pretty much grabbing the MOMENT at the CURRENT point in
  time, so EVERY single time we run our test this point in time will CHANGE which is a big problem for us because
  the SNAPSHOT created by the test it's NEVER going to MATCH the PREVIOUS Snapshot, so we NEED a CONSISTENT way 
  to get back the SAME data from the 'moment()' value WITHOUT changing it, so HOW we can do this? So we're going
  to create a FAKE version of the 'moment' library where we'going to define a SPECIFIC moment in time, the FIRST
  thing to do is to CREATE the '__mocks__'(we just have to STICK to the EXACT same naming convention we used
  for the '__snapshots__' Folder) FOLDER inside the 'test' Folder */
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm correctly with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "New description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set note on textarea change", () => {
  const value = "New note value";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set amount if valid input", () => {
  const value = "23.5";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should not set amount if invalid input", () => {
  const value = "12.122";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should call onSubmit prop for valid form submission", () => {
  /* In order to CREATE a SPY(that is a FAKE Function,also called MOCH Function) we CALL the 'fn()' Function(that 
  takes NO Arguments) and we store the RESULT into a variable(the 'onSubmitSpy' variable in our case). NOW that 
  we have a SPY we actually have access to a BRAND new set of ASSERTIONS. By using SPIES we'll be able to do some
  pretty powerful things, like passing a SPY into a Component that we render and SIMULATE things like our FORM
  submission and actually ENSURE that EVERYTHING went well */
  const onSubmitSpy = jest.fn();
  // As we can see, INSIDE the 'onSubmit' PROPERTY we're passing DIRECTLY the SPY we just created here above
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  /* Here belowe we're SELECTING the 'onDateChange' property of the 'SingleDatePicker' Component and CALLING it(
  because INSIDE the 'onDateChange' we're storing a FUNCTION) with the 'now' variable we just created above here, 
  so the one where we're storing the 'moment()' */
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
