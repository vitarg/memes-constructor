import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  deleteAvatar,
  getUser,
  uploadAvatar,
} from "../../redux/features/application";
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

  const handlerChange = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
    e.target.value = "";
  };

  return (
    <>
      <Grid container>
        <Grid item xs="2">
          <Grid item>
            {user.avatar ? (
              <img
                width={"155px"}
                src={`http://localhost:4000/${user.avatar}`}
                alt="avatar"
                loading="lazy"
              />
            ) : (
              <img
                width={"155px"}
                src={`https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg`}
                alt="avatar"
                loading="lazy"
              />
            )}
          </Grid>
          <Grid item>
            <button onClick={() => dispatch(deleteAvatar())}>Удалить</button>
          </Grid>
          <Grid item>
            <input
              accept="image/*"
              onChange={(e) => handlerChange(e)}
              type="file"
              opacity
              placeholder="загрузить аватар"
            ></input>
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
