import moment from "moment";

/* This FOLDER where this file lives in is called 'fixtures' because THAT is one of the names that is usually
used to define the place where we store "DUMMY TEST DATA" like the one we've created above and that we're using 
in some of our test files */
export default [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: moment(0)
      .subtract(4, "days")
      /* this 'valueOf' is NEEDED becuase the 'createdAt' property it's a NUMBER(we defined it like that), so the 
      'valuesOf' method will EXTRACT the VALUE we want from the "moment Object"(the moment FUNCTION stores his 
      values into a "moment Object", it's just like that library works) and that value it's a NUMBER just like we
      want it to be */
      .valueOf()
  },
  {
    id: "3",
    description: "Credit Card",
    note: "",
    amount: 4500,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
