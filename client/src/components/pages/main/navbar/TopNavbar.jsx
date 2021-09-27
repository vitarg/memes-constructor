import React from "react";
import Sort from "./Sort";
import Search from "./Search";
import CreateMeme from "./CreateMeme";

const TopNavbar = ({currentPage}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sort currentPage={currentPage}/>
      {/* <Search /> */}
      <CreateMeme />
    </div>
  );
};

export default TopNavbar;
