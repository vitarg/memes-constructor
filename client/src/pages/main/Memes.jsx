import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pending from "../../components/preloader/Pending";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getMemes } from "../../redux/features/memes";

import Meme from "./Meme";

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
});

const Memes = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  const memes = useSelector((state) => state.memes.memes);
  const loading = useSelector((state) => state.memes.loading);

  const [searchInput, setSearchInput] = useState("");
  const [alert, setAlert] = useState(false);

  // eslint-disable-next-line array-callback-return
  const searchResult = searchInput
    ? memes.filter((meme) => {
        if (meme.tags.length > 0) {
          for (let i = 0; i < meme.tags.length; i++) {
            if (
              meme.tags[i] &&
              meme.tags[i].toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return meme.tags[i]
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            }
          }
        }
      })
    : [];

  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 30 }}>
      <div>
        <TextField
          id="outlined-search"
          label="Поиск по тегу"
          type="search"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant={"outlined"}
        />
      </div>
      {loading ? (
        <Pending />
      ) : (
        <>
          <Grid container spacing={3}>
            {memes.map((meme) => {
              return <Meme item={meme} setAlert={setAlert} />;
            })}
          </Grid>
          {alert && (
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
          )}
        </>
      )}
    </Box>
  );
};

export default Memes;
