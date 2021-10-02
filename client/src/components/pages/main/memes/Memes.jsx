import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { likeMeme } from "../../../../redux/features/memes";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pending from "../../preloader/Pending";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getMemes } from "../../../../redux/features/memes";
import DownloadIcon from "@mui/icons-material/Download";

const useStyles = makeStyles({
  pages: {
    marginTop: 20,
  },
  page: {
    border: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 40,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    cursor: "pointer",
  },
  currentPage: {
    border: "solid",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 40,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    cursor: "pointer",
  },
  like: {
    display: "flex",
    marginLeft: "auto !important",
    color: "red",
  },
  countLikes: {
    color: "#171717",
    fontSize: 16,
  },
  likedIcon: {
    fontSize: "24px !important",
  },
  notLikedIcon: {
    fontSize: "24px !important",
    color: "#171717",
  },
});

const Memes = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  const userId = useSelector((state) => state.application.id);
  const memes = useSelector((state) => state.memes.memes);
  const loading = useSelector((state) => state.memes.loading);
  const token = useSelector((state) => state.application.token);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);

  const handleLike = (idMeme) => {
    if (!token) {
      setAlert(true);
    } else {
      dispatch(likeMeme(idMeme));
    }
  };

  const data = memes.filter((item) => {
    if (item.tags.length > 0) {
      for (let i = 0; i < item.tags.length; i++) {
        if (
          item.tags[i] &&
          item.tags[i].toLowerCase().includes(search.toLowerCase())
        ) {
          return item.tags[i].toLowerCase().includes(search.toLowerCase());
        }
      }
    }
  });
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 30 }}>
      <div>
        <TextField
          id="outlined-search"
          label="Поиск по тегу"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant={"outlined"}
        />
        <Link to={"/randomMeme"}>Рандомный мэм</Link>
      </div>
      {loading ? (
        <Pending />
      ) : (
        <>
          <Grid container spacing={3}>
            {data.map((item) => {
              return (
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt={item.img}
                      image={item.img}
                    />
                    <CardActions>
                      <Button
                        component={Link}
                        to={`/memes/${item._id}`}
                        variant="contained"
                        color={"primary"}
                      >
                        Подробнее
                      </Button>
                      <Button
                        variant="contained"
                        color={"default"}
                        endIcon={<DownloadIcon />}
                      >
                        Скачать
                      </Button>
                      <Button
                        className={classes.like}
                        onClick={() => handleLike(item._id)}
                        startIcon={
                          item.likes.find((item) => userId === item) ? (
                            <FavoriteIcon className={classes.likedIcon} />
                          ) : (
                            <FavoriteBorderIcon className={classes.notLikedIcon} />
                          )
                        }
                      >
                        <span className={classes.countLikes}>
                          {item.likes.length}
                        </span>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {alert ? (
            <Stack
              sx={{
                width: "30%",
                position: "fixed",
                top: "20%",
                left: "470px",
              }}
              spacing={2}
            >
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error"
              >
                Для этого действия нужно авторизоваться
              </Alert>
            </Stack>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default Memes;
