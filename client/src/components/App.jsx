import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import SignInPage from "./pages/SigninPage"
import SignUpPage from "./pages/SignupPage"
import MainPage from "./pages/main/MainPage";
import CreateMemePage from "./pages/create-meme/CreateMemePage";


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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
