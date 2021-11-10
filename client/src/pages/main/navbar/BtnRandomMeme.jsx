import React from 'react';
import { Link } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import { Button } from '@material-ui/core';

const BtnRandomMeme = () => {
  return (
    <Button
      color={"secondary"}
      variant={"contained"}
      component={Link}
      to={"/randomMeme"}
      endIcon={<CachedIcon />}
    >
      Случайный мем
    </Button>
  );
};

export default BtnRandomMeme;