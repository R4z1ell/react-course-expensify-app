import moment from "moment";

// Get visible expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return (
    expenses
      .filter(expense => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate
          ? startDate.isSameOrBefore(createdAtMoment, "day")
          : true;
        const endDateMatch = endDate
          ? endDate.isSameOrAfter(createdAtMoment, "day")
          : true;
        const textMatch = expense.description
          .toLowerCase()
          .includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
      })
      /* The Function we're passing INSIDE the 'sort' method is called "COMPARISON Function" which defines HOW 
      we're going to SORT base on the RETURNED value, this function takes TWO arguments(usually referred to as 
      'a' and 'b') which represent the two values being compared in EACH operation. IF the function returns a 
      value LESS than zero, we sort 'a' BEFORE 'b', IF the function returns a value GREATER than zero, we sort
      'b' BEFORE 'a', IF the function retuns ZERO we LEAVE 'a' and 'b' UNCHANGED, so we DON'T touch their order */
      .sort((a, b) => {
        if (sortBy === "date") {
          /* If 'a.createdAt < b.createdAt' is TRUE we'll return '1', meaning that 'b' will have a LOWER 'index' 
          than 'a', so 'b' will come FIRST than 'a' in the Array, INSTEAD if the code return FALSE then we'll 
          return '-1' and 'a' will come FIRST than 'b' in the Array */
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === "amount") {
          // 1 = 'b' coming FIRST, -1 = 'a' coming FIRST
          return a.amount < b.amount ? 1 : -1;
        }
      })
  );
};
