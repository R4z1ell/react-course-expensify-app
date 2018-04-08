export default expenses => {
  return (
    expenses
      /* Here below we're using the 'map' method to LOOP though EACH item inside the 'expenses' Array(the one
      we have INSIDE the 'tests/fixtures/expenses.js' file) and we're returning a NEW Array where EACH item is
      the 'amount'(so a NUMBER) and THEN we're using the 'reduce' method to SUM each of these 'amount' value
      and return this TOTAL SUM back in a SINGLE number */
      .map(expense => expense.amount)
      .reduce((sum, value) => sum + value, 0)
  );
};
