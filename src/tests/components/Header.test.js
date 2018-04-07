import React from "react";
import { shallow } from "enzyme";
/* With this 'enzyme-to-json' library we're able to get the CORRECT Snapshot file back, because by default when 
we DON'T have this library installed and imported 'enzyme' will give us back a Snapshot file that contains OTHER 
stuff in it ant NOT just the JSX that is the only thing that we're interested in. So this 'enzyme-to-json' will
pretty much CUT OFF all the unnecessary stuff and return us a CLEAN Snapshot file. The next thing we want to do
is make this CONVERSION from enzyme to CORRECT Json AUTOMATIC, and for that we just need to add the following
code '"snapshotSerializers": ["enzyme-to-json/serializer"]' INSIDE the 'jest.config.json' and with this done we
can actually REMOVE this 'import toJSON' we're usiling below becase we DON'T need it anymore because we're made
it AUTOMATIC */
// import toJSON from "enzyme-to-json";
/* The 'react-test-renderer' library was designed to be a very SIMPLE utility for rendering and we've pretty much 
already covered ALL of its features. We created a NEW 'renderer'(the 'rendered' const we created above), we 
RENDERED something to it with the code 'renderer.render(<Header />)' and at the end we used the 'getRenderOutput' 
method to GET the Output. So as we can see this library can do not a lot and this is a problem for use, because 
in the feature we're going to test way more COMPLEX things and all these things are DIFFICULT to do with this 
library and this is WHY we're going to use ENZYME that like 'react-test-renderer' is a ALSO a renderer library 
for React BUT it has a LOT more features that will help us with COMPLEXT testing */
// import ReactShallowRenderer from "react-test-renderer/shallow"; // Now we're using Enzyme so we can remove it
import Header from "../../components/Header";

test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
  //   const renderer = new ReactShallowRenderer();
  //   /* This 'renderer.render()' below that is pretty much the following code 'ReactShallowRenderer.render()' is
  //   similar to ReactDOM.render() BUT it doesn’t require the DOM and ONLY renders a "single level deep" meaning that
  //   we can test Components isolated from their children. In our case the 'Header' Components has FOUR children
  //   element inside it, an 'h1' element and THREE 'NavLink' Components, so with SHALLOW rendering we can ISOLATE
  //   our 'Header' Component from his children and just TEST it ALONE */
  //   renderer.render(<Header />);
  //   /* After 'renderer.render()' its been CALLED(and we've just done it on the line ABOVE here) we can use this
  //   'getRenderOutput()' method that return us the "shallowly rendered output"(this OUTPUT is pretty much what gets
  //   back from 'React.createElement') of the JSX we've passed in(in our case the 'Header' Component) and on THIS
  //   output we can ADD any assertions we want, in our case we're using the 'toMatchSnapshot' JEST method for example.
  //   The FIRST time we run this TEST case it's ALWAYS going to pass because there is NO existing snapshot, so JEST
  //   is going to go ahead and create a NEW one, it's going to create a SNAPSHOT of what the RENDERED 'Header'
  //   output LOOKED like. The SECOND time we run this test case JEST its going to comprare the NEW Snapshot with the
  //   EXISTING one, if it's the SAME the test will PASS, if it's NOT the test is going to FAIL. When we run this
  //   test we can notice that a '_snapshots_' FOLDER gets created and INSIDE this folder we can find a file that
  //   store the SNAPSHOT pretty much. So with SNAPSHOT we're going to be able to TRACK any changes in our Components
  //   and if something change in the Output we get back we're goingto get NOTIFIED, and then we can decide to TAKE
  //   this new change by using 'yarn test -u' in the terminal OR we can go on the Component page itself, track the
  //   error and RESTORE it's state the PREVIOUS one */
  //   expect(renderer.getRenderOutput()).toMatchSnapshot();
});
