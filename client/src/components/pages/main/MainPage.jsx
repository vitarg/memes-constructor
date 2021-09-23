import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMemes } from "../../../redux/features/memes";
import Memes from "./memes/Memes";
import TopNavbar from "./navbar/TopNavbar";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  return (
    <div style={{padding: 30}}>
      <TopNavbar />
      <Memes />
    </div>
  );
};

export default MainPage;
