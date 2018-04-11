/* Here below we're taking ALL the NAMED EXPORTS from 'firebase(the module) and put them INSIDE a brand NEW
variable that we called 'firebase', we're doing this because 'firebase' DOESN'T have the classis DEFAULT import
that we've used for ALL the other packages we've added to our application, this because 'firebase' is NOT setup
in THAT way. So we when add the STAR symbol '*' we're taking ALL those "Named Exports" from the 'firebase' and
then STORING them inside the 'firebase' variable we just created. So with this way we're pretty much ACCESS to
ALL the 'firebase' methods from INSIDE this 'firebase' variable */
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBeQj6_iiQZjCRWywJyKLaVMnaXA2mZhUg",
  authDomain: "expensify-24573.firebaseapp.com",
  databaseURL: "https://expensify-24573.firebaseio.com",
  projectId: "expensify-24573",
  storageBucket: "expensify-24573.appspot.com",
  messagingSenderId: "26656218110"
};

firebase.initializeApp(config);

const database = firebase.database();

/* This 'ref()' that stands for REFERENCE, give us a "Reference" to a SPECIFIC part of our DATABASE. For example
in a SQL Database we might have various TABLES for our Application, we could have a "users" table or a "notes"
table and so on, THIS allows us to BREAK UP our DATA into INDIVIDUAL little pieces. If instead we had a MongoDB
Database we would have COLLECTIONS(instead of TABLES) like for example we could have an "expenses" Collection
or a "User" Collection and so on. For FIREBASE instead we have the ability to set up various REFERENCES, so we
can reference a DIFFERENT part of our Database and we can store information THERE. We could store "users" in
ONE Location and "Expenses" in ANOTHER, so in Firebase a "Reference" is the SAME thing as a TABLE(for SQL) or
a COLLECTION(for MongoDB). When we DON'T pass ANYTHING inside the 'ref'(like in our example here below) we're 
getting a REFERENCE to the ROOT of our Database and this is why ALL of the Attributes we've provided here below
(so the 'name' or 'age' or 'location' and so on) SHOW UP on the ROOT. Then we've the 'set' method that gets
CALLED on the REFERENCE, we call 'set' to SET the VALUE for the "Reference" and we can provide whatever we want
into 'set', so Object - Array - String - Boolean and so on, so he can take ANY Data Type pretty much */
database
  .ref()
  .set({
    name: "Andrew Mead",
    age: 26,
    isSingle: false,
    location: {
      city: "Philadelphia",
      country: "United States"
    }
  })
  .then(() => {
    console.log("Data is saved!");
  })
  .catch(e => {
    console.log("This failed.", e);
  });

/* An important thing to note is that the 'set' method is ALWAYS going to COMPLETELY WIPE the original reference
value(so it'll wipe ALL the data that was previously stored pretty much) and set it equal to the NEW value */
database.ref().set("This is my data");

/* So when we ONLY want to UPDATE a single property for example the 'age' property in this case and we DON'T
want to actually REMOVE all the OLD Data, we have to PROVIDE the name of the property we want to update INSIDE
the 'ref' method, so the final result will be the WHOLE Object(the one we're using here above) with the 'age'
property UPDATED with a value of 27 */
database.ref("age").set(27);

// This instead is how we can udpate NESTED property
database.ref("location/city").set("New York");

// The 'height' and 'weight' properties are called CHILD(of the 'attributes' property)
database
  .ref("attributes")
  .set({
    height: 173,
    weight: 85
  })
  .then(() => {
    console.log("Second set call worked.");
  })
  .catch(e => {
    console.log("Things didnt worked for the second error", e);
  });

/************* REMOVING DATA *************/

// dabase
//   .ref()
//   .remove()
//   .then(() => {
//     console.log("Data was removed");
//   })
//   .catch(e => {
//     console.log("Did not remove data", e);
//   });

/* There is actually ANOTHER way to REMOVE something from the Database, instead of using the 'remove' method
we're going to use the 'set' method and we'll pass inside it the 'null' value, so THIS it's EXACTLY the SAME
thing as using the 'remove' method. In our case we're REFERENCING the 'isSingle' PROPERTY and setting its value
to NULL, so pretty much REMOVING it from the Database */

database.ref("isSingle").set(null);

/************* UPDATING DATA *************/

/* Unlike the 'set' method which can be called with pretty much ANYTHING we like, the 'update' method INSTEAD
has to be called with an OBJECT because we use this method to change MULTIPLE properties at the SAME time, if 
we JUST want to update a SINGLE property we would just use the 'set' method and NOT 'update' because again the
ALL point of 'update' is to update MULTIPLE things in one shot. In the example below we're going to UPDATE only
those TWO properties('name' and 'age') and ALL the other properties will stay the SAME. Instead if we would use
'set' ALL the other properties('isSingle' and 'location') would be DELETED and we would only have this 'name'
and 'age' below. With the 'update' method we can't just UPDATE properties that we ALREADY have BUT we can also
ADD new one, in our example we've added the 'job' property. We can ALSO choose to DELETE something on the fly
like the 'isSingle' property by SETTING its value to 'null', so with this SINGLE call of the 'update' method 
we're going to UPDATE two properties('name' and 'age'), ADD one NEW property('job') and REMOVE another property
('isSingle'), ALL of this in ONE single call as opposed to use MULTIPLE 'set' and 'remove' call */
database.ref().update({
  name: "Mike",
  age: 29,
  job: "Software developer",
  isSingle: null
});

/************* EXAMPLE *************/

database
  .ref()
  .set({
    name: "Andrew Mead",
    age: 26,
    job: "Software developer",
    location: {
      city: "Philadelphia",
      country: "United States"
    }
  })
  .then(() => {
    console.log("Data is saved!");
  })
  .catch(e => {
    console.log("This failed.", e);
  });

/* In this example we're trying to UPDATE these two properties, 'job' and the NESTED 'city' property INSIDE the
'location' prop. As we will see though this time we're NOT getting the expected result, the 'job' property will
be updated correctly BUT the 'location' property is NOT, because now we have a 'location' property that contain
ONLY the 'city' property(with its value set to 'Boston') BUT the other property, so the 'country' CHILD property
is GONE. So when we're trying to update NESTED Object it will ONLY update at the ROOT level, so like in this 
case it will ONLY update 'location' at the ROOT level so it will pretty much SET the 'location' Object to BE
the one we're defining below, so to ONLY have that 'city' child property, so we're going to LOSE all the other
child properties */
database.ref().update({
  job: "Manager",
  location: {
    city: "Boston"
  }
});

/* Now there is a way to CORRECTLY update a nested child of an Object WITHOUT removing ALL the others, all we've 
to do is to actually provide the reference(so the "location" property) followed by a FORWARD SLASH(so the "/" 
symbol pretty much) and the NAME of the property we want to modify, ALL of this MUST be wrapped into QUOTATION 
marks because we're using the "/" symbol, so exactly like below. So again in this way we're ONLY going to update
the 'city' NESTED property and give her the "Boston" value and NOTHING else we'll be TOUCHED, so the other 
nested property of 'location'(the 'country' property) will STILL be there just like we expect */
database.ref().update({
  job: "Manager",
  "location/city": "Boston"
});

/************* CHALLENGE *************/

database
  .ref()
  .set({
    name: "Andrew Mead",
    age: 27,
    stressLevel: 6,
    job: {
      title: "Software developer",
      company: "Google"
    },
    location: {
      city: "Philadelphia",
      country: "United States"
    }
  })
  .then(() => {
    console.log("Data is saved!");
  })
  .catch(e => {
    console.log("This failed.", e);
  });

database.ref().update({
  stressLevel: 9,
  "job/company": "Amazon",
  "location/city": "Seattle"
});

/************* FETCHING DATA *************/

/* In this example below we're trying to fetch ALL the data we've inside our Database(this is why we're using
the 'ref' method WITHOUT passing NOTHING inside it, in this why we're refering to the ROOT level, so it will
grab ALL at that specific level). NOW we want to fetch our data ONLY a single time so we're going to CHAIN the
'once' method ONTO the 'set' method, this 'once' method takes ONLY one argument that is the EVENT TYPE and for
now where we're trying to fetch ALL of  the data at a SPECIFIC reference we can go ahead and pass the 'value' 
string IN. The 'once' method returns a PROMISE and we can use this promise to do SOMETHING(so using the 'then'
and 'catch' methods pretty much) when the data comes back OR when there is an ERROR while fetching this data.
Now INSIDE the 'then' method we're actually going to pass something in because we did REQUEST some data and 
this data is available to us right here, this DATA is known as 'snapshot' and ON this 'snapshot' we have ACCESS
to our DATA, so we can actually EXTRACT the Object(our Data) by using the 'val' Function onto the 'snapshot',
this 'val' function takes NO Arguments and returns the data we REQUESTED, in our case we requested the ROOT of
our Database wich is an Object containing ALL those properties('name' 'age' 'job' and so on) */
database
  .ref()
  .once("value")
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log("Error fetching data", e);
  });

/* So by using 'once'we get our DATA back ONE single time and our Function NEVER rerun, it either SUCCEEDS or 
FAILS and that is it. If the Data CHANGES though we're NOT going to get NOTIFIED unless we actually make ANOTHER 
query to the Database. So what if we WANTED to have the Server NOTIFY us of changes though? To get that done 
we're going to be switching up the method we use, in this case we're going to change the 'once' method into the 
'on' method that will allow us to LISTEN for something OVER and OVER again, for now we'll stick to the 'value'
EVENT, so we're going to be able to get the value back from the Database initially AND every single time it
CHANGES. Now to actually RUN some code when the value comes back we NEED to pass in a Callback Function as
SECOND argument for the 'on' method, this Callback gets called with the 'snapshot' and then we can DO something
with this 'snapshot' DATA, in our case we print it to the screen as usual. Now REMEMBER that the GOAL in this
case is to HAVE this Callback Function run OVER and OVER again(because we want to be NOTIFIED of EVERY data
changes) and we KNOW that PROMISES can ONLY ever be resolved or rejected a SINGLE TIME with a SINGLE Value SO
this is NOT going to work because there is NO WAY to RERUN a promise MORE TIMES when the Data in our Database
CHANGES and THIS is the reason why we're using a CALLBACK in this example below. What we're going to see now on
the Console of the Browser is the SAME thing as before, so our Object with ALL the data inside it(so all the
properties 'name', 'age' 'job' and so on) but the COOL thing though is that NOW we're SUBSCRIBED to CHANGES, so
we're goingto have this CALLBACK rerun AUTOMATICALLY if the data in our Database EVER changes. So by using the
'on' method we can get back the Data INITIALLY(so the FIRST time the callback actually run) and EVERY time ANY
changes is made to our Data */
database.ref().on("value", snapshot => {
  console.log(snapshot.val());
});

/* In this example below the GOAL is to have a CALL that actually CHANGE the data and to do this we're going
to use the 'setTimeout' function so that we can add a DELAY to better reference a REAL world example. So now
that do we EXPECT to HAPPEN? First up we would expect that we get back the INITIAL value from the 'on' method
where the age is STILL 27 and AFTER a delay of 3.5 seconds we would expect that the code INSIDE the 'setTimeout'
will RUN, chaning the DATA inside our Database, so the 'snapshot' CALLBACK inside the 'on' method will RERUN
and we would have the NEW Data Object printed to the Screen */
setTimeout(() => {
  database.ref("age").set(28);
}, 3500);

/* As well as SUBSCRIBING to ANY changes made in our Database we can ALSO choose to UNSUBSCRIBE from those by
using the 'off' method that gets called with NO arguments, in this way we're going to CANCEL all Subscriptions
and the END result will be that we see the FIRST 'console.log' INSIDE the 'on' method, THEN we ALSO see the
SECOND 'console'log' FIRED by the Callback inside the FIRST  'setTimeout' Function above and THAT is, we will
NOT see the other change printed to the Screen when the 'age' property get set to the value of 30 becuase we
REMOVED the subscription(so we unsubscribed) BUT note that the CHANGE still HAPPENED to our Data, so if we go
INSIDE the Database we would see an 'age' property with a value of 30 */
setTimeout(() => {
  database.ref().off();
}, 7000);

setTimeout(() => {
  database.ref("age").set(30);
}, 10500);

/************* EXAMPLE - FIRST way to Unsubscribe from a SINGLE Subscription *************/

const onValueChange = snapshot => {
  console.log(snapshot.val());
};

database.ref().on("value", onValueChange);

setTimeout(() => {
  database.ref("age").set(28);
}, 3500);

/*  In the example above we passed NOTHING inside the 'off' function meaning that we "Unsubscribed" from ALL the 
Subscription BUT we could also Unsubscribe from a SPECIFIC subscription for example. We can do this in TWO ways, 
the FIRST way is to pass the 'snapshot' Callback directly INSIDE the 'off' Function like here below(we're 
referencing it with the 'onValueChange' variable) */
setTimeout(() => {
  database.ref().off(onValueChange);
}, 7000);

setTimeout(() => {
  database.ref("age").set(28);
}, 10500);

/************* EXAMPLE - SECOND way to Unsubscribe from a SINGLE Subscription *************/

/* As we know the 'on' method RETURNS the 'snapshot' Callback Function so we can DIRECTLY create a variable
right here(the 'onValueChange' variable) where we store the result value pretty much and THEN we still pass
this 'onValueChange' BELOW inside the 'off' method. So this is EXACTLY the same as the FIRST method but it's
the set up we're going to use because if  more CLEAN. We can ALSO be notified of ANY Errors that might occur
if we're trying to access data we DON'T have for example, so INSIDE the 'on' method we can ADD as third argument
ANOTHER Function where can actually DO something with this ERROR, in this case we're going to just print a
message error followed by the ACTUAL Error */
const onValueChange = database.ref().on(
  "value",
  snapshot => {
    console.log(snapshot.val());
  },
  e => {
    console.log("Error with data fetching", e);
  }
);

setTimeout(() => {
  database.ref("age").set(28);
}, 3500);

setTimeout(() => {
  database.ref().off(onValueChange);
}, 7000);

setTimeout(() => {
  database.ref("age").set(28);
}, 10500);

/************* CHALLENGE *************/

/* The 'on' method LISTENS for Data CHANGES in our Database at a SPECIFIC Location, in our case we're LISTENING 
for ALL changes at the ROOT level, so the 'on' method is pretty much what we use to SUBSCRIBE to ANY changes 
that happens to our Data. The 'value' string we're passing as FIRST argument inside the 'on' method is the
"EVENT type", so in this case we're using the 'value' EVENT. This event will trigger ONCE with the INITIAL data
stored at the ROOT location(because we're referencing THAT position) and THEN trigger again EACH time the data 
CHANGES */
database.ref().on("value", snapshot => {
  const val = snapshot.val();
  console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
});

/************* DEALING WITH ARRAY IN FIREBASE *************/

/* This 'push' method allow us to GENERATE a NEW property INSIDE a Collection(in this case the Collection is
'expenses') creating a UNIQUE KEY(an id that gets RANDOMLY created by Firebase) and passing the DATA we put
inside the 'push' method, so this 'push' method  is the most COMMON pattern for ADDING Data to a collection of 
items*/
database.ref("expenses").push({
  description: "Rent",
  note: "",
  amount: 109500,
  createdAt: 93858393
});

database
  .ref("expenses")
  .once("value")
  .then(snapshot => {
    const expenses = [];

    /* What we're doing here is the following. We've created a NEW 'expenses' EMPTY Array and we're ITERATING
    over ALL the 'snapshot' using the 'forEach' method(this is NOT the JavaScript 'forEach' BUT it's the 
    Firebase VERSION of it) and creating a NEW Item in that 'expenses' Array for EACH of our 'snapshot'(so for
    EACH item in our Database pretty much) and at the END we'll have something USEFUL for us, so something that
    we can work with(we're using THIS way because REMEMBER that "Firebase" DOESN'T support ARRAYS, so we're 
    using the 'forEach' and the 'push' method to CREATE something that THEN we can work with inside REDUX)*/
    snapshot.forEach(childSnapshot => {
      expenses.push({
        /* This 'childSnapshot.key' refers to the UNIQUE KEY that gets created by Firebase when we use the
        'push' method to add a NEW Item inside a COLLECTION, just like we've done above for the 'expenses'
        Collection. So we're STORING that Unique key INSIDE the 'id' property, in THIS way we could EASILY
        access ANY of our Database Items */
        id: childSnapshot.key,
        /* Here below we're using the SPREAD Operator to add ALL the properties of the 'childSnashot'(so the
        'description', 'note' 'amount' and 'createdAt' properties pretty much) to this OBJECT that we're creating 
        HERE inside the 'push' method. */
        ...childSnapshot.val()
      });
    });

    /* So NOW after TRANSFORMING our Data we can have a look at them, from the Console we see that now we have
    an ARRAY where EACH Item is an Object and on THAT Object we have ALL the properties we've added initially
    to our Database, so the 'description', 'note', 'amount' and 'createAt' PLUS the NEW property we added, so
    the 'id' prop we've added inside the 'forEach' method above. Now we've created the EXACT STRUCTURE that we
    NEED in order to integrate Firebase inside our Application */
    console.log(expenses);
  });

/************* CHALLENGE *************/

/* Here below we're using the 'on' method to SUBSCRIBE to the 'expenses' Collection, so that when ANY changes
gets made to ONE of our Items we'll get NOTIFIED of these changes, in our example we're going to PRINT the
ENTIRE 'expenses' Collection into the Browser Console with the UPDATED Items */
database.ref("expenses").on("value", snapshot => {
  const expenses = [];

  snapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,

      ...childSnapshot.val()
    });
  });

  console.log(expenses);
});

/************* EVENTS TYPE AVAILABLE ON THE 'on' METHOD *************/

/* This below we've created a SUBSCRIPTION that will NOTIFY us EVERY single time a CHILD of the 'expenses' 
Collection is REMOVED from the Collection itself. In this case we're using the 'child_removed' EVENT Type as
we can see that again will notify us EVERY time an item is REMOVED, so by using these OTHER Events we can get
MORE Information about what's EXACTLY changed in our 'expenses' Collection as OPPOSED to rely on just ONE big
change being triggered where we've to recalculate ALL of the 'expense' and THEN maybe manually figure out what
got REMOVED, instead with the 'child_removed' EVENT this is REALLY easy to see */
database.ref("expenses").on("child_removed", snapshot => {
  console.log(snapshot.key, snapshot.val());
});

/* Another EVENT that we've is the 'child_changed' that is going to fire EVERY time one of the 'expenses' CHILD
gets CHANGED, so when one of the properties gets changed the ACTUAL Callback is going to TRIGGER and will notify
us. So NOW if we go into our Firebase Database and actually CHANGE one of the properties for a given Item we'll
see that the Callback is going to FIRE and we'll see the NEW updated Data printed to the Screen as expected */
database.ref("expenses").on("child_changed", snapshot => {
  console.log(snapshot.key, snapshot.val());
});

/* The last EVENT we're going to see is the 'child_added' Event, this is going to be triggered ONCE for EACH
initial CHILD inside the 'expenses' Collection and it will get triggered AGAIN every time a NEW Child is ADDED.
So in our Case the FIRST time we subscribe to this 'child_added' Event we'll see printed to the Console ALL the
Item inside the 'expenses' Collection ONE by ONE, and THEN we'll be NOTIFIED for EVERY added child */
database.ref("expenses").on("child_added", snapshot => {
  console.log(snapshot.key, snapshot.val());
});
