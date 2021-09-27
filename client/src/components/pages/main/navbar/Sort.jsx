import React, { useState,useEffect } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from "react-redux";
import { getMemes } from "../../../../redux/features/memes";

const Sort = ({currentPage}) => {

  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemes(sort, currentPage));
  }, [sort, currentPage]);
  return (
    <div>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={sort}
          label="Age *"
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="new">По дате</MenuItem>
          <MenuItem value="popular">По популярности</MenuItem>
        </Select>
      </FormControl>
  </div>
  )
};

export default Sort;
