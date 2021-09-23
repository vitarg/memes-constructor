import React from "react";
import { Box, Typography } from "@material-ui/core";
import Templates from "./Templates";

const CreateMemePage = () => {
  return (
    <div>
      Создать мем
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
