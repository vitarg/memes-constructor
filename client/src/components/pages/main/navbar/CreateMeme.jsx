import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const CreateMeme = () => {
  return (
    <Button
      variant="contained"
      component={Link}
      to="/create-meme"
      color={"primary"}
    >
      Создать Мем
    </Button>
  );
};

export default CreateMeme;
