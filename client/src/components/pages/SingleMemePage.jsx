import {
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
  CardMedia,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMemes } from "../../redux/features/memes";

const useStyles = makeStyles({});

function SingleMemePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  const memes = useSelector((state) => state.memes.memes);

  const find = memes.find((item) => id === item._id);
  if (find) {
    return (
      <>
        <Grid container>
          <Grid item xs={5}>
            <Box>
              <CardMedia component={"img"} src={find.img} />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  return <></>;
}

export default SingleMemePage;
