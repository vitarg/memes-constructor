import React from "react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "./header/Header";
import SignInPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignupPage";
import MainPage from "./pages/main/MainPage";
import Account from "./pages/Account";
import CreateMemePage from "./pages/create-meme/CreateMemePage";
import SingleMemePage from "./pages/SingleMemePage";
import RandomMemePage from "./pages/RandomMemePage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/create-meme">
          <CreateMemePage />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <Route path="/sign-up">
          <SignUpPage />
        </Route>
        <Route path="/account/:id">
          <Account />
        </Route>
        <Route path="/memes/:id">
          <SingleMemePage />
        </Route>
        <Route path="/RandomMeme">
          <RandomMemePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
