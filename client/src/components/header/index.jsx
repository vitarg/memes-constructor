import React from "react";
import {
  AppBar,
  Button,
  Box,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/application";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../logo.svg";
import { IconButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    backgroundColor: "#2a9d8f",
    padding: "10px 30px ",
  },

  profile: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "150px",
    position: "relative",
  },
  profileLogo: {
    fontSize: "40px",
  },
  profileLogoLink: {
    color: "black",
  },
  logOutBtn: {
    "&:hover": {
      background: "none",
    },
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.application.token);
  const id = useSelector((state) => state.application.id);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position={"static"}>
      <Box className={classes.header}>

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
            {/*<Link className={classes.profileLogoLink} to={`/account/${id}`}>*/}
            {/*  <AccountCircleIcon className={classes.profileLogo} />*/}
            {/*</Link>*/}
            <IconButton onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Профиль</MenuItem>
              <MenuItem onClick={handleClose}>Настройки</MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  className={classes.logOutBtn}
                  variant={"default"}
                  onClick={handleLogout}
                  component={Link}
                  to={"/"}
                >
                  Выйти
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}

export default Header;
