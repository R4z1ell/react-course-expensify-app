import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    {/* This 'Link' Component(that comes from 'react-router-dom') uses behind the scenes CLIENT Side ROUTING as
    opposed to Server side Routing, so if we now go to a 404 PAGE(so to a URL that DOESN'T exist in our list of 
    ROUTE) and we CLICK on the 'Go home' link we find there we'll see that NOW the Browser doest NOT REFRESH the
    Page and INSTEAD JavaScript just SWAP things out ON THE FLY, so it makes a new call to 'ReactDOM.render' and
    render us back the 'ExpenseDashboardPage' COMPONENT(so the Component associate with the '/' ROOT URL) as
    OPPOSED to the 'NotFoundPage' COMPONENT and ALL of this is done by simply adding the 'Link' Component and
    LINKING it to the ROUTE where we want to go when we CLICK on it(in this case the '/' url). So we're going
    to use this 'Link' Component inside our Application almost everywhere EXCEPT for our NAVIGATION Link(in THAT
    case we're going to use the 'NavLink' Component). So EVERY TIME we want to go to a PAGE that WE control, so
    to a URL that is DEFINED in our ROUTES where going to use the 'Link' Component, if INSTEAD we want to go to 
    an EXTERNAL URL(like google or something else for example) in THAT case is perfectly fine to use the REGULAR 
    Anchor tag(so the 'a' html  element pretty much) because we're not going to have the ADVANTAGES of "Client 
    Side Routing" anyways BUT when we're linking INTERNALLY in our Application we WANT to make sure to use the 
    'Link' Component in order to take ADVANTAGE of "Client Side ROUTING" */}
    404! - <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
