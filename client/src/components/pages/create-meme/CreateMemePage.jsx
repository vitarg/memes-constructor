import React from "react";
import { Box, Typography } from "@material-ui/core";
import Templates from "./Templates";
import Create from "./Create";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  templatesBox: {
    marginTop: 60,
  },
});

const CreateMemePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Box>
        <Create />
      </Box>
      <Box className={classes.templatesBox}>
        <Typography
          align={"center"}
          component={"h1"}
          variant={"h4"}
          gutterBottom
        >
          Шаблоны
        </Typography>
        <Box>
          <Templates />
        </Box>
      </Box>
    </div>
  );
};

export default CreateMemePage;
