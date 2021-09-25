import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  templateWrapper: {
    width: 400,
    height: 400,
    background: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Canvas = () => {
  const classes = useStyles();
  return <Box className={classes.templateWrapper}>Выберите шаблон</Box>;
};

export default Canvas;
