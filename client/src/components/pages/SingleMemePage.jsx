import {
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Avatar,
  CardMedia,
  Box,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMemes } from "../../redux/features/memes";
import { getComments } from "../../redux/features/comments";
import { createComments } from "../../redux/features/comments";

const useStyles = makeStyles({});

function SingleMemePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const memes = useSelector((state) => state.memes.memes);
  const comments = useSelector((state) => state.comments.comments);

  const { id } = useParams();

  const [comment, setComment] = useState(null);

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(createComments(id, comment));
  };

  const find = memes.find((item) => id === item._id);

  const findComm = comments.filter((item) => {
    if (item.memeId === id) {
      return item;
    }
  });

  if (find) {
    return (
      <>
        <Grid container>
          <Grid item xs={5}>
            <Box style={{ padding: "20px 20px" }}>
              <CardMedia component={"img"} src={find.img} />
            </Box>
          </Grid>
        </Grid>
        <div style={{ padding: 14 }} className="App">
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Comments
          </h1>
          <Grid container>
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "end",
                }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleComment}
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Text"
                  multiline
                  rows={4}
                  variant="outlined"
                  style={{ width: "700px" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  type="submit"
                  style={{
                    marginLeft: "10px",
                  }}
                  variant="outlined"
                >
                  Отправить
                </Button>
              </Box>
            </Grid>
          </Grid>
          {findComm.map((item) => {
            return (
              <Paper style={{ padding: "40px 20px", marginTop: 25 }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://localhost:4000/${item.userId.avatar}`}
                    />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {item.userId.name}
                    </h4>
                    <p style={{ textAlign: "left" }}>{item.text}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      {new Date(item.createdAt).getDate()}.
                      {new Date(item.createdAt).getMonth()}.
                      {new Date(item.createdAt).getYear() - 100}
                    </p>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
}

export default SingleMemePage;
