import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import HomePage from './pages/HomePage';
import SignInPage from "./pages/SigninPage"
import SignUpPage from "./pages/SignupPage"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage/>
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
