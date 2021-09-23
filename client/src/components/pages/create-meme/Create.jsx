import React from "react";
import { Grid } from "@material-ui/core";

const Create = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        Картинка шаблона
      </Grid>
      <Grid item xs={6}>
        Инструменты
      </Grid>
    </Grid>
  );
};

export default Create;
