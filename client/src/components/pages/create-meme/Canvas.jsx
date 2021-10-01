import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "tui-image-editor/dist/tui-image-editor.css";
// import ImageEditor from "@toast-ui/react-image-editor";

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

const myTheme = {};

const locale_ru_RU = {
  Crop: "Обрезать",
  "Delete-all": "Удалить всё",
  Text: "Текст",
  Bold: "Жирный",
  Italic: "Курсив",
  Underline: "Подчеркнутый",
  Load: "Загрузить",
  Download: "Скачать",
  Color: "Цвет",
  "Text size": "Размер шрифта",
};

const Canvas = () => {
  const classes = useStyles();

  const instanceRef = useRef(null);

  const [topText, setTopText] = useState({
    text: "top",
    position: {
      x: 10,
      y: 10,
    },
  });

  const [bottomText, setBottomText] = useState({
    text: "bottom",
    position: {
      x: 10,
      y: 100,
    },
  });

  const handleChangeTextTop = (e) => {
    setTopText();
  };

  useEffect(() => {
    const ImageEditor = require("tui-image-editor");
    instanceRef.current = new ImageEditor(document.getElementById("canvas"), {
      cssMaxWidth: 800,
      cssMaxHeight: 600,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    });
  }, []);

  useEffect(() => {
    instanceRef.current
      .addText(topText.text, {
        styles: {
          fill: "#000",
          fontSize: 20,
          fontWeight: "bold",
        },
        position: topText.position,
      })
      .then((objectProps) => {
        console.log(objectProps.id);
      });
  }, [topText]);

  return (
    <>
      <div id={"canvas"} className={classes.canvas} />
      <button>Текст</button>
    </>
  );
};

export default Canvas;
