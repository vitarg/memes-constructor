import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Pending = () => {
  return (
      <Box style={{textAlign: 'center', marginTop: '150px'}}>
        <CircularProgress />
      </Box>
  );
};

export default Pending;