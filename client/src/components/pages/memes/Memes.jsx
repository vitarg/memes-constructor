import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';


const Memes = () => {
  const memes = useSelector((state) => state.memes.memes)
  return (
    <Grid container spacing={3}>
      {memes.map((item) => {
        return (
          <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="./logo192.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default Memes;