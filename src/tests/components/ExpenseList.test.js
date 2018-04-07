/* The GOAL here is to TEST the 'ExpenseList' Component. When we're testing a React Component we actually want
to test the UNCONNECTED version because we want to be able to provide a set of DYNAMIC 'props', so we DON'T want
to take these 'props' from the 'store' INSTEAD we're just going to provide 'expenses'(because THAT is the 'prop' 
we pass inside the Component) DIRECTLY. To actually TEST the "unconnected" version of the Component we have to
actually EXPORT IT(and for doing this we've added and 'export' in front of the 'ExpenseList' Component inside
the 'ExpenseList.js' file), so NOW we've TWO Components being exported from this the 'ExpenseList.js' file. One
is the UNCONNECTED Version of the 'ExpenseList' Component and the other is the CONNECTED Version(so the following
code 'connect(mapStateToProps)(ExpenseList)'). So now we're going to IMPORT the UNCONNECTED version HERE inside
this file and use some SNAPSHOT Testing, so passing SOME Data in it to make sure it works as EXPECTED */
import React from "react";
import { shallow } from "enzyme"; // we use it to RENDER our Component
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
  /* As we know the 'ExpenseList' Component EXPECT to receive an 'expenses' prop and this is exactly what we're 
  doing here below, THEN we're setting this 'expenses' prop to be EQUAL to the 'expenses' DUMMY Test Array we're 
  importing above */
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  /* NOW that we've our 'wrapper' RENDERED Component(that we defined just here above) we can setup the SNAPSHOT,
  just REMEMBER that the FIRST team we run the test we DON'T have a SNAPSHOT file so the test can NEVER fail and
  will ALWAYS pass(this is valid ONLY for the FIRST time we run the test). So when we run the test for the FIRST
  time the SNAPSHOT file will be CREATED and used as a REFERENCE for all subsequent times. Now that we've the
  SNAPSHOT for this file we will be NOTIFIED every time a change to the 'ExpenseList' Component is made */
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
  /* In this case we're passing in an EMPTY Array inside the 'expenses' property and when we RUN the test(so 
  when we run the 'yarn test' command in the terminal) we'll NOW see that INSIDE the SNAPSHOT of this file we 
  have the NEW code that will be used when we have an EMPTY Array, so when the '<p>No expenses</p>' line of
  code it's been RENDERED */
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
