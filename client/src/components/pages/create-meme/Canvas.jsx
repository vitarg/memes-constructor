import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

const useStyles = makeStyles({
  templateWrapper: {
    width: 400,
    height: 400,
    background: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const myTheme = {
  // Theme object to extends default dark theme.
};

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
  return (
    <ImageEditor
      includeUI={{
        loadImage: {
          path: img,
          name: "SampleImage",
        },
        locale: locale_ru_RU,
        theme: myTheme,
        menu: ["text", "crop"],
        initMenu: "filter",
        uiSize: {
          width: "1000px",
          height: "700px",
        },
        menuBarPosition: "right",
      }}
      cssMaxHeight={500}
      cssMaxWidth={700}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
      usageStatistics={true}
    />
  );
};

export default Canvas;
