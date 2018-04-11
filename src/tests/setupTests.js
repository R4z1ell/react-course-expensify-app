/* This file is just a CONFIGURATION file for 'enzyme', we're pretty much telling ENZYME to use the ADAPTER for
React Version 16(so 'enzyme-adapter-react-16'). So NOW when we use ENZYME in our tests this file will add support 
for React version 16, so the one we're just using in the Project */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DotEnv from "dotenv";

DotEnv.config({ path: ".env.test" });

Enzyme.configure({
  adapter: new Adapter()
});
