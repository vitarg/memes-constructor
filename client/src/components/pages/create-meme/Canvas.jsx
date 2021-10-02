import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { addMeme } from "../../../redux/features/memes";

const useStyles = makeStyles({
  templateWrapper: {
    width: 400,
    height: 400,
    background: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    width: "80%",
    height: 500,
  },
});

const Canvas = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const template = useSelector((state) => state.templates.template);

  const canvasTitle = template
    ? ""
    : "Вы можете выбрать один из шаблонов или загрузить свой";

  const instance = useRef(null);

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
    <>
      <div className={"select"}>{canvasTitle}</div>
      <div id={"canvas"} className={classes.canvas} />
      <div>
        <button onClick={handleAddText}>Добавить текст</button>
        <button onClick={handlePublication}>Опубликовать</button>
        <button onClick={handleDownload}>Скачать</button>
      </div>
    </>
  );
};

export default Canvas;
