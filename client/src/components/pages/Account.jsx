import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../redux/features/application";
import { getMemesByAuthor } from "../../redux/features/memes";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";

function Account() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.application.user);
  const memes = useSelector((state) => state.memes.memes);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  useEffect(() => {
    dispatch(getMemesByAuthor(id));
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs="2">
          <Grid item>
            <img
              width={"155px"}
              src={user.avatar}
              alt="avatar"
              loading="lazy"
            />
          </Grid>
          <Grid item>
            <Typography component="h4">{user.name}</Typography>
          </Grid>
          <Grid item>
            <Typography component="h4">{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid item xs="9">
          <Typography component="h1" variant="h4">
            Мои мемы
          </Typography>
          <Grid container spacing={3}>
            {memes.map((item) => {
              return (
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="400"
                      image={item.img}
                    />
                    <CardActions>
                      <Button variant="contained" color={"primary"}>
                        Сделать мем
                      </Button>
                      <Button variant="contained" color={"secondary"}>
                        Сохранить
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Account;
