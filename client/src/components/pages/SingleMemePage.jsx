import {
  Grid,
  Button,
  Paper,
  Avatar,
  CardMedia,
  Box,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMemes } from "../../redux/features/memes";
import { getComments } from "../../redux/features/comments";
import { createComments } from "../../redux/features/comments";
import Pending from "./preloader/Pending";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function SingleMemePage(props) {
  const dispatch = useDispatch();

  const memes = useSelector((state) => state.memes.memes);
  const comments = useSelector((state) => state.comments.comments);
  const loading = useSelector((state) => state.comments.loading);
  const token = useSelector((state) => state.application.token);

  const { id } = useParams();

  const [comment, setComment] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!token) {
      setAlert(true);
    } else {
      dispatch(createComments(id, comment));
    }
  };

  const find = memes.find((item) => id === item._id);

  const findComm = comments.filter((item) => item.memeId === id);

  if (find) {
    return (
      <>
        {loading ? (
          <Pending />
        ) : (
          <>
            <Grid container>
              <Grid item xs={5}>
                <Box style={{ padding: "20px 20px" }}>
                  <CardMedia component={"img"} src={find.img} alt={find.img} />
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
                    Войдите на аккаунт
                  </Alert>
                </Stack>
              ) : (
                <></>
              )}
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
        )}
      </>
    );
  }
  return <></>;
}

export default SingleMemePage;
