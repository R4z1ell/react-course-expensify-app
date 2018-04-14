/* We're importing 'React' because we're using JSX inside the Component below and this JSX gets CONVERTED to
'React.createElement' when parsed, so for this reason we need to import 'React' */
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

/* Here below we're DESTRUCTURING the 'props' Object and getting the INDIVIDUAL things OFF of it, and the things
we want to get off are 'description', 'amount' and 'createdAt', these are pretty much the properties that we 
have inside the '{...expense}' Object that we're using in the 'ExpenseList' COMPONENT(so inside the 
'ExpenseList.js' fike) */
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format("MMMM Do, YYYY")}
      </span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format("$0,0.00")}
    </h3>
  </Link>
);

export default ExpenseListItem;
