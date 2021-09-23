import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
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
                height="280"
                image="./logo192.png"
              />
              <CardActions>
                <Button size="small">Сделать мем</Button>
                <Button size="small">Сохранить</Button>

              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default Memes;