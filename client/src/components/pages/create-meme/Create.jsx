import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Canvas from "./Canvas";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: 400
  },
  container: {
    marginTop: 40,
  },
  input: {
    marginTop: 20,
    background: "#fff",
  },
  generateBtn: {
    marginTop: 'auto'
  },
  left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Create = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} className={classes.left}>
        <Canvas />
      </Grid>
      <Grid item xs={6}>
        <form className={classes.form}>
          <TextField
            label={"Текст 1"}
            variant={"outlined"}
            className={classes.input}
          />
          <TextField
            label={"Текст 2"}
            variant={"outlined"}
            className={classes.input}
          />
          <Button
            color={"primary"}
            variant={"contained"}
            className={classes.generateBtn}
          >
            Сгенерировать
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Create;
