import React from "react";
import { AppBar, Button, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/application";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../logo.svg";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    backgroundColor: "#2a9d8f",
    padding: "10px 30px ",
  },
  logoHeader: {
    width: "60px",
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },
  profile: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "150px",
  },
  profileLogo: {
    fontSize: "40px",
  },
  profileLogoLink: {
    color: "black",
  },
  escBtn: {
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
    color: "white",
  },
  signIn: {
    borderRadius: 99,
    padding: "6px 25px",
    background: "#e9c46a",
    "&:hover": {
      background: "#90be6d",
    },
  },
}));

function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.application.token);
  const id = useSelector((state) => state.application.id);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position={"static"}>
      <Box className={classes.header}>
        <Button component={Link} to={"/"}>
          <img className={classes.logoHeader} src={logo} alt={"logo"} />
          <span className={classes.logoText}>Memash</span>
        </Button>
        {!token ? (
          <Button
            className={classes.signIn}
            variant="contained"
            component={Link}
            to={"/sign-in"}
            startIcon={<ExitToAppIcon />}
          >
            Войти
          </Button>
        ) : (
          <Box className={classes.profile}>
            <Button
              className={classes.escBtn}
              variant="contained"
              color="success"
              onClick={handleLogout}
              component={Link}
              to={"/"}
            >
              Выйти
            </Button>
            <Link className={classes.profileLogoLink} to={`/account/${id}`}>
              <AccountCircleIcon className={classes.profileLogo} />
            </Link>
          </Box>
        )}
      </Box>

    </AppBar>
  );
}

export default Header;
