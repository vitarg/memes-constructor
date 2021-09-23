import React from "react";
import { Box, Typography } from "@material-ui/core";
import Templates from "./Templates";
import Create from './Create';

const CreateMemePage = () => {
  return (
    <div>
      <Box>
        <Create />
      </Box>
      <Box>
        <Typography>Шаблоны</Typography>
        <Box>
          <Templates />
        </Box>
      </Box>
    </div>
  );
};

export default CreateMemePage;
