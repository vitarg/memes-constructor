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
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons//Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import GetAppIcon from "@material-ui/icons/GetApp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Pending from './preloader/Pending';
import { saveAs } from "file-saver";

const useStyles = makeStyles((theme) => ({
  profile: {
    paddingLeft: "25px",
    textAlign: "center",
  },
  inp: {
    display: "none",
  },
  avatar: {
    marginTop: "15px",
    borderRadius: "50%",
    width: "155px",
    height: "155px",
  },
  delBtn: {
    backgroundColor: "transparent",
    border: "none",
  },
  name: {
    fontSize: "20px",
    fontFamily: "sans-serif",
    border: "1px solid black",
    display: "inline-block",
    padding: "0px 7px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "42px",
    letterSpacing: "0",
    fontWeight: "600",
    color: "#383e45",
    marginBottom: "8px",
    lineHeight: "46px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    textAlign: "center",
  },
  btnCont: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Account() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.application.user);
  const memes = useSelector((state) => state.memes.memes);
  const loading = useSelector((state) => state.memes.loading);

  const handleSave = (img) => {
    saveAs(`http://localhost:4000/${img}`, "meme.jpg");
  };

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
        <Grid className={classes.profile} item xs="2">
          <Grid item>
            {user.avatar ? (
              <img
                className={classes.avatar}
                src={`http://localhost:4000/${user.avatar}`}
                alt="avatar"
                loading="lazy"
              />
            ) : (
              <img
                className={classes.avatar}
                width={"155px"}
                src={`https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg`}
                alt="avatar"
                loading="lazy"
              />
            )}
          </Grid>
          <Grid item>
            <label for="inp">
              <EditIcon />
            </label>
            <input
              id="inp"
              className={classes.inp}
              accept="image/*"
              onChange={(e) => handlerChange(e)}
              type="file"
              placeholder="загрузить аватар"
            ></input>
            <button
              className={classes.delBtn}
              onClick={() => dispatch(deleteAvatar())}
            >
              <HighlightOffIcon />
            </button>
          </Grid>
          <Grid item>
            <Typography className={classes.name} component="h4">
              {user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs="9">
          <Typography component="h1" variant="h4" className={classes.title}>
            Мои мемы
          </Typography>
          {loading ? <Pending/> :
            <Grid container spacing={3}>
              {memes.map((item) => {
                return (
                  <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image={`http://localhost:4000/${item.img}`}
                      />
                      <CardActions className={classes.btnCont}>
                        <Button variant="secondary" color={"secondary"} onClick={() => handleSave(item.img)}>
                          <GetAppIcon style={{ color: "black" }}/>
                        </Button>
                        <Button variant="secondary" color={"secondary"}>
                          <BookmarkIcon/>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          }
        </Grid>
      </Grid>
    </>
  );
}

export default Account;
