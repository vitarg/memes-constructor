import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoHeader: {
    width: "60px",
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },
});

const Logo = () => {
  const classes = useStyles();
  return (
    <Button component={Link} to={"/"}>
      <img className={classes.logoHeader} src={logo} alt={"logo"} />
      <span className={classes.logoText}>Memash</span>
    </Button>
  );
};

export default Logo;
