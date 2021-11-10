import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/features/application";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles({
  menuBtn: {
    "&:hover": {
      background: "none",
    },
  },
});

const HeaderMenu = ({ anchor, open, setAnchor }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const id = useSelector((state) => state.application.id);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchor}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>
        <Button
          component={Link}
          to={`/account/${id}`}
          className={classes.menuBtn}
          startIcon={<AccountCircleIcon />}
        >
          Профиль
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          startIcon={<LogoutIcon />}
          className={classes.menuBtn}
          variant={"default"}
          onClick={handleLogout}
          component={Link}
          to={"/"}
        >
          Выйти
        </Button>
      </MenuItem>
    </Menu>
  );
};

export default HeaderMenu;
