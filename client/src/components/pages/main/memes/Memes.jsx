import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    position: "relative",
    right: "22px",
  },
});

const Memes = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userId = useSelector((state) => state.application.id);
  const memes = useSelector((state) => state.memes.memes);
  const [search, setSearch] = useState("");

  const handleLike = (idMeme) => {
    dispatch(likeMeme(idMeme));
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
          label="Search field"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <Grid container spacing={3}>
        {data.map((item) => {
          return (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={item.img}
                />
                <CardActions>
                  <Button variant="contained" color={"primary"}>
                    Сделать мем
                  </Button>
                  <Button variant="contained" color={"secondary"}>
                    Сохранить
                  </Button>
                  <Button onClick={() => handleLike(item._id)}>
                    {item.likes.find((item) => userId === item) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </Button>
                  <div className={classes.like}>{item.likes.length}</div>
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
