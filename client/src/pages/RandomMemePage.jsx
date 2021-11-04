import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CardMedia,
  Grid,
  Card,
  CardActions,
  Button,
} from "@material-ui/core";
import { rndMeme } from "../redux/features/memes";

function RandomMemePage() {
  const dispatch = useDispatch();
  const memes = useSelector((state) => state.memes.memes);

  useEffect(() => {
    dispatch(rndMeme());
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component={"img"}
              alt="green iguana"
              image={memes?.img}
            />
            <CardActions />
          </Card>
        </Grid>
      </Grid>
      <Button onClick={() => dispatch(rndMeme())} variant="contained">
        Еще
      </Button>
    </Box>
  );
}

export default RandomMemePage;
