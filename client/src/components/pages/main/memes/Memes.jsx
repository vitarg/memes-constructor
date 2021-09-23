import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from "@material-ui/core";

const Memes = () => {
  const memes = useSelector((state) => state.memes.memes);
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginTop: 30}}>
      <Grid container spacing={3}>
        {memes.map((item) => {
          return (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="400"
                  image="./logo192.png"
                />
                <CardActions>
                  <Button variant="contained" color={'primary'}>Сделать мем</Button>
                  <Button variant="contained" color={'secondary'}>Сохранить</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Memes;
