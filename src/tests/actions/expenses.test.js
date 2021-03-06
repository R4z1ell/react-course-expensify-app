import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    /* Here below we're ITERETING over the 'expenses' Array(the DUMMY Test Data Array we're importing above) 
    and for EACH Item inside this 'expenses' Array we're storing ALL their DATA(precisely the FOUR properties
    'description', 'note', 'amount' and 'createdAt') INSIDE the 'expensesData[id]'(that it's pretty much the
    VALUE of the 'id' property for EACH item inside the 'expenses' Array). So in the END we'll have an
    'expensesData' variable(that INITIALLY we set to an EMPTY Object) that will STORE three Items(because three 
    are the ORIGINAL items inside the 'expenses' Array) and THOSE Item will be stored INSIDE each ID. So we'll
    have something like this pretty much    
    { 1: {amount: 195, createdAt: 0, description "Gum", note: ""}, 2: {...}, 3: {....}} */
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    /* By passing the 'done' argument above and CALLING the 'done()' function HERE below we're making sure that
    the 'beforeEach' above DOESN'T allow the TEST cases(so ALL our TESTS we have in THIS file) to RUN until 
    "Firebase" have actually STORED our Data INSIDE the Database */
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  /* When we're using OBJECTS or ARRAYS we want to use the 'toEqual' method(coming from JEST) INSTEAD if we're
  using BOOLEAN, NUMBERS or STRINGS we want to use the 'toBe' method */
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove expense from firebase", done => {
  // Here below we're creating our FAKE 'store' to make sure that EVERYTHING was dispatched CORRECTLY
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      // Here below we're returning a PROMISE, this is the reason why we can add that 'then' method here below
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});

test("should edit expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

test("should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

/* This below is an ASYNCHRONOUS Test so we NEED a way to tell 'jest'(our testing Library) that THIS Test is
Asynchronous, and we do it by passing 'done' as the FIRST Argument of the Callback. In this way we're FORCING
'jest' to WAIT until the moment in time where we CALL 'done()' */
test("should add expense to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  /* Here below we're using "PROMISE CHAINING" that allows us to ATTACH a 'then'(or 'catch') CALL onto PROMISES 
  from elsewhere in our code. In our case we set up THIS code 'store.dispatch(startAddExpense(expendeData))' to 
  return a PROMISE(we've achieved this by adding a RETURN keyword BEFORE the 'dispatch' inside our 'expense.js'
  file, the one inside 'src/actions' folder), so NOW we can ADD a 'then' method on it, then INSIDE the 'then' 
  method we add our ASSERTIONS and in the end(so when our ASSERTIONS have been terminated) we can finally call 
  'done()' */
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      // This 'store.getActions()'(a method of 'redux-mock-store') below will return an ARRAY of ALL the ACTIONS
      const actions = store.getActions();
      // And this 'actions[0]' is the FIRST Action Object INSIDE the above 'actions' ARRAY we just defined
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      /* this '${actions[0].expense.id}' below is pretty much the UNIQUE ID that gets generated by Firebase, and
    we can use it to actually FETCH that Item */
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    // Here below we're CHAINING a 'then' method because ABOVE we're returning a PROMISE
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })

    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test("should setup set expense action object with data", () => {
  // This 'expenses' below refers to our DUMMY Test Data Array we're importing ABOVE
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    // This 'expenses' below is AGAIN the Dummy Test Data Array, we're using as usual the ES6 Object Syntax
    expenses
  });
});

/* Since we're creating an ASYNCHRONOUS TEST we NEED to provide 'done' as the FIRST Argument below. By doing
this we're letting 'jest'(our testing Library) KNOW to NOT consider this test a SUCCESS or a FAILURE until 
'done()' is CALLED */
test("should fetch the expenses from firebase", done => {
  /* In order to take ADVANTAGE of our ASYNCHRONOUS Functionality we're going to need to CREATE our MOCK 'store'
  (so our FAKE 'store' only for TESTING purpose) */
  const store = createMockStore(defaultAuthState);
  /* We DON'T need to pass ANY Data INSIDE the 'startSetExpenses' Function because it TAKES none(we defined 
  this Function to NOT take ANY argument) */
  store.dispatch(startSetExpenses()).then(() => {
    /* With this code below we're grabbing ALL the Actions INSIDE our FAKE 'store' we just created above, in
    THIS case though we ONLY expect to have just ONE Action there(so the 'SET_EXPENSES' Action pretty much) */
    const actions = store.getActions();
    // Here below we're SELECTING the FIRST Item we have INSIDE the 'actions' variable we created here above
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      // This 'expenses' refers to the DUMMY Test Data Array we're importing at the top of this file
      expenses
    });
    done();
  });
});
