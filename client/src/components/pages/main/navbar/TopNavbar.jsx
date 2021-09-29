import React from "react";
import Sort from "./Sort";
import CreateMeme from "./CreateMeme";

const TopNavbar = ({ currentPage }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sort currentPage={currentPage} />
      <CreateMeme />
    </div>
  );
};

export default TopNavbar;
