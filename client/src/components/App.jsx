import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "green" }}>Шапка сайта</div>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
