import React from "react";
import Memes from "./memes/Memes";
import TopNavbar from "./navbar/TopNavbar";
import { useSelector } from "react-redux";

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
