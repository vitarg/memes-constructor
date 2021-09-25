import React from "react";
import Sort from "./Sort";
import Search from "./Search";
import CreateMeme from "./CreateMeme";

const TopNavbar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sort />
      {/* <Search /> */}
      <CreateMeme />
    </div>
  );
};

export default TopNavbar;
