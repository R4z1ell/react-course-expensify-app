import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import Header from "../components/Header";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
  /* This 'BrowserRouter' Component(that comes from the 'react-router-dom' package) needs to be specified ONLY 
  one time and INSIDE it we can ad AS MANY 'Route' Components as we want BUT we NEED to put ALL those 'Route'
  Component INSIDE a 'div' because the API for the 'BrowserRouter' Components EXPECTS the CHILD that we PASS in
  to either NOT exist OR to have a LENGTH of ONE, so if we just add MULTIPLE 'Route' Components WITHOUT putting
  them ALL inside a 'div' we would BREAK the 'BrowserRouter' component so to FIX this problem we can just put
  all of them inside the 'div' like we're already doing below */
  <BrowserRouter>
    <div>
      <Header />
      {/* So NOW we're STILL conforming to the 'BrowserRouter' API because we ONLY have ONE Child(so just this
    new 'Switch' Component) where we have ALL our 'Route' Components. So what exactly does the 'Switch' 
    Component DO? Wehen 'react-router' SEES 'Switch' it's going to move through our 'Route' Components in ORDER 
    and it's going to STOP when it FINDS a MATCH, which means that if we're on the ROOT page(so the '/' URL) 
    he's going to see the FIRST 'Route' Component and it will find a MATCH and so it's going to STOP and it 
    will NEVER check the OTHER 'Route' Components. If INSTEAD we're currenly on the '/help' PAGE it's going to 
    go through our 'Route' Components LIST from top to bottom and CHECK each one of them UNTIL it FIND a MATCH, 
    so until he reach the '/help' Route where it will find a MATCH and will STOP there without going on and 
    checking the OTHER 'Route' Components, this means that we're NOT going to see the 'NotFoundPage' when ONE 
    of these 'Route' Components DOES match, because 'Switch' is going to STOP right away as soon as he found 
    the MATCHING 'Route' BUT if NONE of our 'Route' MATCH the 'Switch' is going to CONTINUE looking for a match 
    UNTIL it gets to the BOTTOM where it will find the 'NotFoundPage' that ALWAYS matches and so THIS 
    'NotFoundPage' is the ROUTE that will SHOW UP for ROUTES that aren't DEFINED */}
      <Switch>
        {/* By adding the 'exact' PROPERTY on the first 'Route' Component here below and setting it to TRUE(by 
      DEFAULT is set to FALSE) we're saying that THIS '/' ROUTE will ONLY show in the Browser IF the PATH is
      EXACTLY matching the Route itself so ONLY if we're visiting the ROOT URL. So NOW when we visit the second
      Route(so the '/create' Route) we will ONLY see the 'AddExpensePage' Component being rendered to the 
      Screen and NOT both Components(so also the 'ExpenseDashboardPage' Component) like we were having BEFORE 
      applying this 'exact={true}' PROPERTY because NOW that Component will ONLY show if we're actually visiting 
      EXACTLY that SPECIFIC Route */}
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        {/* Remember that the 'path' property is completely OPTIONAL, in this case we DON'T have one for example.
      NOW every time we visit a URL that is NOT available inside our ROUTES we'll see this 404 PAGE instead */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
