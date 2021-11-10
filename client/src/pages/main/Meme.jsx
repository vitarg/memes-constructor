import React from "react";
import { Button, Card, CardActions, CardMedia, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import { likeMeme } from "../../redux/features/memes";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
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
  imageMem: {
    position: "relative",
    width: 400,
    height: 450,
    margin: "auto",
    lineHeight: 100,
  },
  imageCardMeme: {
    position: "absolute",
    margin: "auto",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

const Meme = ({ item, setAlert }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.application.id);
  const token = useSelector((state) => state.application.token);

  const handleSave = (img) => {
    saveAs(`http://localhost:4000/${img}`, "meme.jpg");
  };

  const handleLike = (idMeme) => {
    if (!token) {
      setAlert(true);
    } else {
      dispatch(likeMeme(idMeme));
    }
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }} className={classes.cardMeme}>
        <div className={classes.imageMem}>
          <CardMedia
            component="img"
            alt={item.img}
            image={item.img}
            className={classes.imageCardMeme}
          />
        </div>
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
            onClick={() => handleSave(item.img)}
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
            <span className={classes.countLikes}>{item.likes.length}</span>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Meme;
