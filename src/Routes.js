import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import GetStarted from './components/GetStarted/GetStarted';
import Profile from './components/Profile/Profile';
import AddCoffee from './components/AddCoffee/AddCoffee';
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import CoffeeStore from './components/CoffeeStore/CoffeeStore';
import Cart from './components/Cart/Cart';
import ThankYou from './components/ThankYou/ThankYou';
import Private from './components/Private/Private';

export default <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/nav" component={Nav} />
    <Route path='/private' component={Private} />
    <Route path="/get-started" component={GetStarted} />
    <Route path="/profile" component={Profile} />
    <Route path="/add-coffee" component={AddCoffee} />
    <Route path="/coffee-details" component={CoffeeDetails} />
    <Route path="/coffee-store" component={CoffeeStore} />
    <Route path="/cart" component={Cart} />
    <Route path="/thank-you" component={ThankYou} />
</Switch>