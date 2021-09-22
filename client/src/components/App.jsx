import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{backgroundColor: 'green'}}>Шапка сайта</div>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
