// This below is HOW we REQUIRE the ACTUAL 'moment' module INSTEAD of a MOCK Version
const moment = require.requireActual("moment");

/* This is the FUNCTION that will actually be called INSIDE of the MOCKED 'moment' Library when we RUN our TEST
file. Pretty much NOW when we run our test command('yarn test') the JEST library KNOWS that it should PRIORITIZE
the MOCKED version of 'moment'(or ANY module we mock) for ALL our Components INTEAD of the REGULAR library. So
NOW when we run our tests we're going to use this DUMMY Data we just created below, where we're setting a DEFAULT
'timestamp' value of ZERO so that ALL the SNAPSHOTS that gets created will use the SAME value and NOT the REAL
'timestamp' which is DIFFERENT every time. Now we have another problem though, HOW we actually IMPORT the REAL
version of the 'moment' library HERE in this file? well, if we use the 'import moment from 'moment'' like we
have done with ALL our files untill now THIS will NOT work, what we have to do is use the 'requireActual' method
of JEST that allow us to actually import the REAL library */
export default (timestamp = 0) => {
  return moment(timestamp);
};
