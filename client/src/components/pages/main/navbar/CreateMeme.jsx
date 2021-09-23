import React from "react";
import { Button, Link } from "@material-ui/core";

const CreateMeme = () => {
  return (
    <Button variant="contained" component={Link} to='/create-meme' color={"primary"}>
      Создать Мем
    </Button>
  );
};

export default CreateMeme;
