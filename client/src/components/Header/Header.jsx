import React from "react";
import { AppBar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../redux/features/application"

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);

  const handleLogout = () => {
    dispatch(logOut())
  }
  
  return (
    <AppBar position={"static"} >
      {
      !token ? <Button variant="primary" component={Link} to={"/sign-in"}>Войти</Button> :
               <Button variant="primary" color="error" onClick={handleLogout}>Выйти</Button>
      }
    </AppBar>
  );
}

export default Header;