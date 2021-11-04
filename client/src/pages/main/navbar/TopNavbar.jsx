import React from "react";
import Sort from "./Sort";
import CreateMeme from "./CreateMeme";
import { Link } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonsBox: {
    display: "flex",
    justifyContent: "space-between",
    width: '30%',
    height: 40
  }
})

const TopNavbar = ({ currentPage }) => {
  const classes = useStyles()
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sort currentPage={currentPage} />
      <Box className={classes.buttonsBox}>
        <Button
          color={"secondary"}
          variant={"contained"}
          component={Link}
          to={"/randomMeme"}
          endIcon={<CachedIcon />}
        >
          Рандомный мем
        </Button>
        <CreateMeme />
      </Box>
    </div>
  );
};

export default TopNavbar;
