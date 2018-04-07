import { createStore } from "redux";

/* This 'incrementCount' below is an "Action Generators", so a function that return an "Action Object". As FIRST
argument in the CALLBACK we're passing in the PAYLOAD(so the CUSTOM Data that we want to PASS) that we're going
to DEFAULT to an EMPTY Object, so there are times where this PAYLOAD will NOT exist and that's OK. Now INSIDE
the ACTION Object(so the Object that we RETURN for this 'incrementCount') we can ADD the 'incrementBy' property
that will be DEFINED on every single INSTANCE of this ACTION, which means that we're going to add it's value
RIGHT HERE as opposed to down below inside the INCREMENT 'case' of the SWITCH statement of the 'store'. Let's
NOTE that we NEED to pass the EMPTY Object in this 'payload' because if we DON'T pass it we will get an ERROR
in the Console, because now the 'payload' will be UNDEFINED and we're trying to access an 'incrementBy' property
of UNDEFINED and we know that this is not possible and THIS is the reason why the console throw us that ERROR, so
again we HAVE to DEFINE that EMPTY Object for the 'payload' */
// const incrementCount = (payload = {}) => ({
//   type: "INCREMENT",
//   incrementBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
// });

/* As we can see here below we're using DESTRUCTURING in place of the PAYLOAD and we've also added a DEFAULT
value of 1(so we're going to use the actual VALUE of 'incrementBy' if this data gets PASSED IN, if we DON'T have
it we just refer to the DEFAULT value, so the ONE ) to it and we're also using the ES6 Object shorthand with the 
'incrementBy'. With this in place as we can see from the SAME code above we've GREATLY reduced the complexity of 
the code and the result will STILL be the exact same as before but now we've a much more cleaner code, all of 
this thanks to DESTRUCTURING. So how is this going to work? IF when we DISPATCH this 'incrementCount' function
we ALSO pass in the OBJECT with the 'incrementBy' property AND value we're going to use THAT value, INSTEAD if
we DON'T provide any Object we're going to use the DEFAULT EMPTY Object that when is going to be DESTRUCTURED
will result in the value of ONE because of course the Object was EMPTY so we DON'T have any 'incrementBy' set in
there */
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  // This code below is a SHORTHAND for 'incremenBy = incrementBy'
  incrementBy
});

/* The FIRST thing we're going to do is to DESTRUCTURE the ARGUMENT that gets passed INSIDE this 'decrementCount'
function(that can be an OBJECT or NOTHING), IF it's an Object we're going to DESTRUCTURE it, INSTEAD if NOTHING 
is passed we're just starting off as an EMPTY Object. So if the Object EXIST we're just going to destructure the
'decrementBy' PROPERTY, instead if this property DOESN'T exist we refer to the DEFAULT value of ONE */
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

/* In this case we DON'T need to set a DEFAULT value for 'count' because we FORCE it to have the value that get
passed in as payload, in our case this value is 101 */
const setCount = ({ count } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

// Example of a NOT "Pure Function"
// let a = 10;
// const add = b => {
//   return a + b;
// };

// We also DON'T want to change things that are OUTSIDE
// let result;
// const add = (a, b) => {
//   result = a + b;
// };

// Reducers
// 1. Reducers are "Pure Functions"
// 2. Never change 'state' or 'action' inside the Reducers

/* This below is a RECUDER, reducers are PURE FUNCTIONS, those are NOT just like REGULAR Function BUT they have 
certain QUALITIES, first up the OUTPUT is ONLY determined by the INPUT. In our case we can clearly see that this
Function OUTPUT, so what it RETURN it's ONLY determined by the THINGS that get PASSED IN(so the 'state' and the
'action'). It DOESN'T use anything ELSE from outside the Function SCOPE and it DOESN'T change ANYTHING outside
of the Function Scope EITHER. Let's consider an example of a NOT "Pure Function" like the one we have above here,
in THIS case as we can see what gets returned(so 'a+b')  is NOT just dependent on the INPUT(so the 'b' argument
we're passing in) BUT is also dependent on the GLOBAL variable 'a' we defined in the OUTSIDE SCOPE which COULD
indeed CHANGE. Now we DON'T want this for our REDUCERS, because they need to COMPUTE(calcolare) the NEW 'state'
based off of the OLD 'state' AND the 'action'(so the TWO argument we PASS inside this 'counterReducer' below
pretty much). ASIDE from using things defined OUTSIDE of the Function we ALSO don't want to CHANGE things outside
of the REDUCER(just look at the OTHER example above), in that case we're CHANING the 'result' variable and we 
DON'T want to change variables coming from OUTSIDE the Reducer SCOPE because we don't want to RELY on values from
variables outside of the Reducer SCOPE, we ONLY want to JUST use the INPUT 'state' and 'action' to return the NEW
'state' value. The SECOND thing of PURE FUNCTION is that we DON'T want to DIRECTLY change the 'state' and the
'action' that get passed into the REDUCER, so we DON'T want to reassign a value for 'state' OR 'action' if they're
variables or MUTATE them instead if they're OBJECT, the ONLY thing we want to do is to READ OFF of these ARGUMENTS
(so the 'state' and 'action' arguments) and at the end of the day JUST return the NEW 'state' and THIS is how we
MANIPULATE the 'state' of the REDUX STORE */
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        // 'state.count' is the DEFAULT 'state' value(so the INITIAL value of our 'state' that is ZERO)
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

/* This FIRST argument we pass inside the 'createStore' function is the CURRENT 'state', now we DON'T have a
'constructor' Function where we can set up a DEFAULT 'state' so we actually setup the default RIGHT here inside
the 'createStore' function where we're going to have an OBJECT with a SINGLE property 'count' and we're going
to START the 'count' at ZERO(for THIS example we're going to STICK with the counter example where we can
INCREMENT or DECREMENT the 'count' or RESET it). The SECOND argument in the 'createStore' Function is the ACTION
itself, an 'action' is just an OBJECT that contain the INSTRUCTION(that got sent to the 'store') to do SOMETHING
in there, like for example INCREMENT the 'count' by 1, so ACTIONS are our way to COMMUNICATE with the 'store' */
const store = createStore(countReducer);

/* The CALLBACK we're passing inside this 'subscribe' Function gets called EVERY single time the 'store' CHANGES
and in this case we're going to PRINT the CURRENT 'state' to the Console when any of our ACTIONS gets DISPATCHED.
We can not ONLY 'subscribe' to the 'store' BUT we can ALSO REMOVE our individual subscription, so let's say we 
want to STOP subscribing at some point, we can do it by CALLING the RETURN value from 'subscribe'(that is a 
FUNCTION, so the 'store.getState()' pretty much) */
// store.subscribe(() => {
//   // With this console.log we're going to PRINT the 'state' EVERY single time it CHANGES
//   console.log(store.getState());
// });

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

/* The 'dispatch' Function is ACTUALLY responsible to send our ACTION to the 'store', dispatching an Action is 
the ONLY way to trigger a 'state' CHANGE */
// store.dispatch({
//   type: "INCREMENT",
//   /* This is how we're able to pass DYNAMIC information along INSIDE of our ACTION Object, the 'store' can then
//   use that information to CALCULATE the NEW 'state' */
//   incrementBy: 5
// });

/* So NOW when we CALL this 'unsubscribe' the subscription will STOP, which means that we're going to see the
'state' printed to the screen ONLY one time for the 'INCREMENT' dispatch we have above and THEN it will STOP, so 
we will NOT see ALL the other ACTIONS below printed to the screen this time, because by the time these three
actions RUNS we've ALREADY unsubscribed, the 'state' is STILL changing it's just that we're NOT being NOTIFIED
via 'subscribe' because we UNSUBSCRIBED */
// unsubscribe();

/* Using this 'incrementCount' ACTION generator(so a Function that return an ACTION Object) is a BETTER solution
than using INLINE Action Object because if for example we have a TYPO(so a writing mistake) and we're using
INLINE Action Object we WOULDN'T get ANY Error INSIDE the Console, and we'll be pretty hard to then find the 
error inside our code, INSTEAD if we use this "Action Generator" and we make a TYPE, NOW we'll actually get an
Error INSIDE the Console, so we'll be fast and simple for us to find and FIX that problem. So this was JUST one
of the REASON of why we should use "Action Generator' OVER "INLINE Action Object", the OTHER reason */
store.dispatch(incrementCount({ incrementBy: 5 }));

/* This below is a just a REGULAR "Action generator", INSTEAD above we've an "Action Generator" where we're 
passing a PAYLOAD(so a CUSTOM Data that we want to THEN use inside the ACTION). So with this "Action Generator"
where we're not passing a PAYLOAD we're just going to INCREMENT the 'count' of our 'store' by 1 */
store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

/* Aside from ACTIONS that takes NO EXTRA values(like a simple 'INCREMENT' action) or an ACTION that takes in
extra value(like for example the 'DECREMENT' action where we're ALSO passing the 'decrementBy' value of 10) we
can ALSO create ACTIONS that have a REQUIRED types by just using them DIRECTLY as opposed to CHECKING if they
EXIST. So when someone will dispatch this 'SET' Action we're going to FORCE the 'count' value of our 'state' to
be 101 */
store.dispatch(setCount({ count: 101 }));
