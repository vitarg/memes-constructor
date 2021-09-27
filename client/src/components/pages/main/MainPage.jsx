import React, { useEffect, useState } from "react";
import Memes from "./memes/Memes";
import TopNavbar from "./navbar/TopNavbar";
import { useDispatch, useSelector } from 'react-redux';
import { getMemes } from '../../../redux/features/memes';

const MainPage = () => {
  const currentPage = useSelector((state) => state.memes.currentPage);

  return (
    <div style={{padding: 30}}>
      <TopNavbar currentPage={currentPage}/>
      <Memes currentPage={currentPage}/>
    </div>
  );
};

export default MainPage;
