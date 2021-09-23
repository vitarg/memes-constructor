import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import CreateMemePage from "./pages/create-meme/CreateMemePage";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "green" }}>Шапка сайта</div>

      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/create-meme">
          <CreateMemePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
