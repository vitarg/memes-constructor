import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemes } from '../../redux/features/memes';
import Memes from './memes/Memes';
import { Box, Grid } from '@material-ui/core';

const HomePage = () => {
  const dispatch = useDispatch();
  const memes = useSelector((state) => state.memes.memes)

  useEffect(() => {
    dispatch(getMemes())
  }, [])


  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>input1</div>
        <div>input222</div>
        <div>input333</div>
        <div>input444</div>
      </div>
        <Box sx={{ flexGrow: 1 }}>
             <Memes />
        </Box>


    </div>
  );
};

export default HomePage;