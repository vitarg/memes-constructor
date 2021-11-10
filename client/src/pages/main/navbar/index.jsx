import React from "react";
import Sort from "./Sort";
import BtnCreateMeme from "./BtnCreateMeme";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BtnRandomMeme from "./BtnRandomMeme";

const useStyles = makeStyles({
  buttonsBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
    height: 40,
  },
});

const TopNavbar = ({ currentPage }) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sort currentPage={currentPage} />
      <Box className={classes.buttonsBox}>
        <BtnRandomMeme />
        <BtnCreateMeme />
      </Box>
    </div>
  );
};

export default TopNavbar;
