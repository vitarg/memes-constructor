import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";

const Memes = () => {
  const memes = useSelector((state) => state.memes.memes);

  const [search, setSearch] = useState("");

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
    </Box>
  );
};

export default Memes;
