import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const CreateMeme = () => {
  return (
    <Button
      variant="contained"
      component={Link}
      to="/create-meme"
      color={"primary"}
      endIcon={<AddOutlinedIcon />}
    >
      Создать Мем
    </Button>
  );
};

export default CreateMeme;
