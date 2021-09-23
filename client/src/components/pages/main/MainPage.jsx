import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemes } from '../../../redux/features/memes';
import Memes from './memes/Memes';
import { Box, TextField } from '@material-ui/core';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemes())
  }, [])

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextField id="outlined-search" label="Search field" type="search" />
        <div>input333</div>
        <div>input333</div>
        <div>input444</div>
      </div>
        <Box sx={{ flexGrow: 1 }}>
             <Memes />
        </Box>


    </div>
  );
};

export default MainPage;