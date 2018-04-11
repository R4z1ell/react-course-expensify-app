/* To create a PROMISE we use the 'new' keyword followed by the 'Promise' Constructor that takes as FIRST 
argument a FUNCTION, inside this Function we put our "Asynchronous Task"(like a request to a Server or we're
looking for files in the File System, so ANY sort of long running Asynchronous Task). When this code is DONE 
we go ahead and call ONE of TWO Functions depending on whether things went well or DIDN'T go well, those two
Functions are provided as ARGUMENTS for the Function we've passed INSIDE the Promise itself, they're called
'resolve' and 'reject'. IF we call 'resolve' means that things went well(so we successfully get the data back
from a Server for example) INSTEAD if we call 'reject' means that something went WRONG and we return the ERROR.
*/
const promise = new Promise((resolve, reject) => {
  resolve("This is my resolved data");
});

/* So HOW exactly we DO something when the Promise either SUCCEEDS or FAILS? We access the 'promise' and we
CALL the 'then' method that let's us REGISTER a Callback Function that is going to FIRE when and IF the promise
RESOLVES. Inside the Callback we pass the 'data' that we got back from the 'resolve' above and we can for 
example LOG this 'data' on the Screen. So now we've created a Promise that RESOLVE some 'data', we've WAITED
for things to COMPLETE and when they DO complete all we do is DUMP the 'data' to the screen.  */
promise.then(data => {
  console.log(data);
});

/****************** EXAMPLE ******************/

/* Now to create a more meaningful real world example we're going to SIMULATE some sort of arbitrary DELAY 
with the 'setTimeout' function, so we're going to FORCE the 'promise' to WAIT(a time we DEFINE) before it 
actually RESOLVES. By using this TECHNIQUE we're going to be able to do all sorts of interesting things
ESPECIALLY with "Firebase", we're going to be able to FETCH data and WAIT for the data to COME BACK and do
SOMETHING with it. The SAME is true when we're WRITING data, we can start the process of writing the data and
do something when "Firebase" says YES the data was written successfully */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is my resolved data");
  }, 1500);
});

// The message we've inside the 'resolve' will now be printed to the Screen AFTER 1.5 seconds
promise.then(data => {
  console.log(data);
});

/****************** EXAMPLE ******************/

/* A thing to NOTE is that a 'promise' can either be RESOLVED or REJECTED, we CAN'T 'resolve' AND 'reject' a
promise and we can ONLY 'resolve' or 'reject' a SINGLE time. So let's take for example this case below where
we're using a SECOND 'resolve', now we MAY think that this Callback will run TWICE but the "Promise API" was
NOT designed for this, the 'promise' can either be RESOLVED or REJECTED, when it is resolved OR rejected it 
can NEVER be resolved or rejected AGAIN which means that this SECOND 'resolve' we've added is going to get
completely IGNORED */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is my resolved data");
    resolve("This is my other resolved data");
  }, 1500);
});

/* ONLY the FIRST 'resolve' will be printed on the Screen and the other message is NEVER going to show up
because the 'promise' is IGNORING this other 'resolve' CALL, so again we can resolve a SINGLE time */
promise.then(data => {
  console.log(data);
});

/****************** EXAMPLE ******************/

/* It's ALSO important to NOTE that we can ONLY pass a SINGLE Argument to 'resolve' or 'reject', so if we TRY 
for example to pass a SECOND argument to 'resolve'(the string "other" in this case) and then we also try to
to ACCESS it(by passing 'other' as second argument INSIDE the 'then' method), well this is NOT going to work */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is my resolved data", "other");
  }, 1500);
});

promise.then((data, other) => {
  console.log(data);
});

/****************** EXAMPLE ******************/

/* IF we DO need MORE than ONE piece of information we can just go ahead and 'resolve' an OBJECT, so we could
for example pass this Object below and ADD to it as many properties as we like */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: "Andrew",
      age: 26
    });
  }, 1500);
});

/* So in this case we'll see printed on the Screen the ENTIRE Object with ALL his PROPERTIES and we can ACCESS
both of them in whatever way we want */
promise.then(data => {
  console.log(data);
});

/****************** EXAMPLE ******************/

/* Until now we've ONLY seen how to 'resolve' a promise, so when the things we EXPECTED to happen went well
and REALLY happened, for example we said that we wanted to fetch the weather from an API and the weather was
successfully fetched for us BUT we know that things can ALSO go WRONG and in those cases we use the 'reject'.
'reject' follows the SAME rules as 'resolve', meaning that we can call it ONLY a single time and ONLY with a
single ARGUMENT */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 1500);
});

/* In THIS case we DON'T get back this 'console.log' inside the Browser Console BUT we actually get back a
JavaScript ERROR('Uncaught (in promise) Something went wront!'). Now we DON'T want a whole bunch of JavaScript
ERRORS getting thrown in but we want to do something SPECIFIC when that happens, so maybe we want to try the
request AGAIN or we want to show a MESSAGE to the user. So to actually DO something when our 'promise' DOES get
REJECTED we ADD a call to the 'catch' method, 'catch' is VERY similar to the 'then' method, it gets called with
a SINGLE Function(a Callback) that gets FIRED when the 'promise' REJECT and inside this Callback we can pass
the ACTUAL data that in THIS case we will call 'error'(though we COULD name it ANYTHING we like). So now with
this 'error' we could do whatever we want BUT for now we're just going to print it to the Screen after those
1.5 seconds has passed, so NOW we have a way to do something when either the 'promisee' RESOLVE or REJECT and
this is EXACTLY what we're going to do with our "Firebase" data */
promise
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("error: ", error); // error: Something went wrong!
  });

/************ DIFFERENT PROMISE SYNTAX ************/

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 1500);
});

/* There are actually a LOT of ALTERNATIVES Syntax for the 'promise', for example the 'then' method can actually 
take TWO Arguments(that are Functions) and we can use it INSTEAD of the 'catch', so like this example below. 
So in THIS case the SECOND Argument Function will be treated like the 'catch' handler and if we RERUN the code
we're still going to get the SAME 'error' message EVENT though we have NEVER set up the 'catch' method call.
So now as we mentioned BEFORE, when we work with 'promise' about 99% of the time we're going to be working
ONLY with 'then' and 'catch' and VERY VERY rarely we'll find ourselves CREATING our OWN 'promise' because most
of the time the Promises are going to be created by the Library we're using, for example by a library like
"Firebase", so what we're going to do is just ATTACH Handlers('then' and 'catch') to RUN when the promises
either RESOLVES or REJECTS */
promise.then(
  data => {
    console.log(data);
  },
  error => {
    console.log("error: ", error);
  }
);
