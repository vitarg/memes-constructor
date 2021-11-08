import React from "react";
import { AppBar, Button, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    backgroundColor: "#2a9d8f",
    padding: "10px 30px ",
  },

  signIn: {
    borderRadius: 99,
    padding: "6px 25px",
    background: "#e9c46a",
    "&:hover": {
      background: "#90be6d",
    },
  },
});

function Header() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const token = useSelector((state) => state.application.token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position={"static"}>
      <Box className={classes.header}>
        <Logo />
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
          <Box>
            <IconButton onClick={handleClick}>
              <AccountCircleIcon fontSize={"large"} color={"primary"} />
            </IconButton>
            <HeaderMenu anchor={anchorEl} open={open} setAnchor={setAnchorEl} />
          </Box>
        )}
      </Box>
    </AppBar>
  );
}

export default Header;
