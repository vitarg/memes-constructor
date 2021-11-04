import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardMedia, Card, CardActions, Button } from "@material-ui/core";
import { rndMeme } from "../redux/features/memes";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from "@mui/icons-material/Cached";

const useStyles = makeStyles({
  box: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: "auto",
    height: "500px",
  },
  button: {
    margin: "30px auto 0",
  },
});

function RandomMemePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const memes = useSelector((state) => state.memes.memes);

  useEffect(() => {
    dispatch(rndMeme());
  }, []);

  return (
    <Box className={classes.box}>
      <Card>
        <CardMedia
          className={classes.img}
          component={"img"}
          alt="green iguana"
          image={memes?.img}
        />
        <CardActions />
      </Card>
      <Button
        onClick={() => dispatch(rndMeme())}
        variant="contained"
        color={"primary"}
        className={classes.button}
        startIcon={<CachedIcon />}
      >
        Еще
      </Button>
    </Box>
  );
}

export default RandomMemePage;
