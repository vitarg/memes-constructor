import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch} from "react-redux";
import { getMemes } from "../../../redux/features/memes";

const Sort = () => {
  const [sort, setSort] = useState("По умолчанию");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemes(sort));
  }, [sort]);
  return (
    <div>
      <FormControl required sx={{ m: 1, minWidth: 120 }} style={{width: 220}}>
        <InputLabel id="demo-simple-select-required-label">
          Сортировать
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={sort}
          label="Age *"
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="">
            <em>По умолчанию</em>
          </MenuItem>
          <MenuItem value="new">По дате</MenuItem>
          <MenuItem value="popular">По популярности</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
