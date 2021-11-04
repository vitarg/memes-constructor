import React from "react";
import { Grid} from "@material-ui/core";
import Canvas from "./Canvas";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
  },
});

const Create = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Canvas />
    </Grid>
  );
};

export default Create;
