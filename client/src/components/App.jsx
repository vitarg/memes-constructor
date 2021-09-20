import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          Главная
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
