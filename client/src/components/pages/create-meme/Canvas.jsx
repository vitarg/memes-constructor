import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

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

  const [select, setSelect] = useState(
    "Вы можете выбрать один из шаблонов или загрузить свой"
  );

  const template = useSelector((state) => state.templates.template);
  console.log(template?.img, "template");

  const [templateImg, setTemplateImage] = useState(template);


  console.log(templateImg, "state");

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

    if (templateImg) {

      setTemplateImage(template.img);
      console.log(templateImg, 'state')
      instance.current.loadImageFromURL(templateImg, "lena").then((result) => {
        console.log("old : " + result.oldWidth + ", " + result.oldHeight);
        console.log("new : " + result.newWidth + ", " + result.newHeight);
      });
    }

    instance.current.startDrawingMode("TEXT");
  }, []);

  const handleAddImage = () => {
    instance.current
      .loadImageFromURL(
        "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300",
        "lena"
      )
      .then((result) => {
        console.log("old : " + result.oldWidth + ", " + result.oldHeight);
        console.log("new : " + result.newWidth + ", " + result.newHeight);
      });

    setSelect("");
  };

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

  return (
    <>
      <div className={"select"}>{select}</div>
      <div id={"canvas"} className={classes.canvas} />
      <div>
        <button onClick={handleAddImage}>Картинка</button>
        <button onClick={handleAddText}>Текст</button>
        <button onClick={handleDownload}>Скачать</button>
      </div>
      <img src={templateImg} alt="asd" />
    </>
  );
};

export default Canvas;
