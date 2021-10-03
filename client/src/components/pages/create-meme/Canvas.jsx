import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { addMeme } from "../../../redux/features/memes";
import { Box, Button, Grid } from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const useStyles = makeStyles({
  container: {
    padding: 40,
  },
  templateWrapper: {
    width: 400,
    height: 400,
    background: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "80%",
    height: 500,
    background: "#e5e5e5",
    borderRadius: 4,
    boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15)",
  },
  tools: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  toolsHeader: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  toolsFooter: {
    display: "flex",
    justifyContent: "space-between",
  },
  white: {
    margin: "0 5px",
    padding: 0,
    width: 36,
    height: 36,
    background: "white",
    border: "none",
    boxShadow: "0 0 2px rgba(0,0,0,.25)",
    borderRadius: 4,
    cursor: "pointer",
  },
  black: {
    margin: "0 5px",
    padding: 0,
    width: 36,
    height: 36,
    background: "black",
    border: "none",
    boxShadow: "0 0 2px rgba(0,0,0,.25)",
    borderRadius: 4,
    cursor: "pointer",
  },
  addTextBox: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Canvas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const instance = useRef(null);
  const template = useSelector((state) => state.templates.template);

  useEffect(() => {
    const ImageEditor = require("tui-image-editor");

    instance.current = new ImageEditor(document.querySelector("#canvas"), {
      cssMaxWidth: 700,
      cssMaxHeight: 500,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    });

    instance.current.startDrawingMode("TEXT");
  }, []);

  useEffect(() => {
    (async () => {
      await instance.current
        .loadImageFromURL(template?.img, "lena")
        .then((result) => {
          console.log("old : " + result.oldWidth + ", " + result.oldHeight);
          console.log("new : " + result.newWidth + ", " + result.newHeight);
        });
    })();
  }, [template]);

  const handleAddText = async () => {
    await instance.current.on("addText", ({ originPosition }) => {
      instance.current.addText("", {
        styles: {
          fill: "white",
          textAlign: "center",
          fontStyle: "bold",
          fontFamily: "Impact",
          stroke: "black",
        },
        position: originPosition,
      });
    });
  };

  const handleDownload = () => {
    saveAs(instance.current.toDataURL());
  };

  const handlePublication = () => {
    dispatch(addMeme(instance.current.toDataURL(), template));
  };

  return (
    <Grid container spacing={4} className={classes.container}>
      <Grid item xs={8}>
        <div id={"canvas"} className={classes.canvas} />
      </Grid>
      <Grid item xs={4} className={classes.tools}>
        <Box className={classes.toolsHeader}>
          <Box className={classes.addTextBox}>
            <Button variant={"contained"} onClick={handleAddText}>
              Добавить текст
            </Button>
          </Box>
          <Button disabled variant={"contained"} endIcon={<FileUploadIcon />}>
            Загрузить свою картинку
          </Button>
        </Box>
        <Box className={classes.toolsFooter}>
          <Button
            endIcon={<DownloadIcon />}
            color={"secondary"}
            variant={"contained"}
            onClick={handleDownload}
          >
            Скачать
          </Button>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={handlePublication}
          >
            Опубликовать
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Canvas;
