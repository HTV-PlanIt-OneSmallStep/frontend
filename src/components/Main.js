import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../pages/Signup';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/../pages/Homepage/index' component={Home}></Route>
      <Route exact path='/../pages/AddTask/index' component={Signup}></Route>
    </Switch>
  );
}

export default Main;