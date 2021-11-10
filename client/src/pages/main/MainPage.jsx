import React from "react";
import Memes from "./Memes";
import { useSelector } from "react-redux";
import TopNavbar from "./navbar";

const MainPage = () => {
  const currentPage = useSelector((state) => state.memes.currentPage);

  return (
    <div style={{ padding: 30 }}>
      <TopNavbar currentPage={currentPage} />
      <Memes currentPage={currentPage} />
    </div>
  );
};

export default MainPage;
