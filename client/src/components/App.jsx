import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import CreateMemePage from "./pages/create-meme/CreateMemePage";
import { Button } from "@material-ui/core";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "green" }}>
        <Button component={Link} to={"/"}>
          На главную
        </Button>
      </div>

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
