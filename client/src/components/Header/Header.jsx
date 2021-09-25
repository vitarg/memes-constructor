import React from "react";
import { AppBar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/application";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);
  const id = useSelector((state) => state.application.id);
  console.log(id);
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position={"static"}>
      {!token ? (
        <Button variant="primary" component={Link} to={"/sign-in"}>
          Войти
        </Button>
      ) : (
        <>
          <Button variant="primary" color="error" onClick={handleLogout}>
            <Link to={`/`}>Выйти</Link>
          </Button>
          <Link to={`/account/${id}`}>
            <AccountCircleIcon />
          </Link>
        </>
      )}
    </AppBar>
  );
}

export default Header;
