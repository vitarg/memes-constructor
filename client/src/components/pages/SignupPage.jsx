import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {createUser} from "../../redux/features/application"
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    padding: "6px",
    width: "395px",
    textAlign: "center"
  }
}));

function SignupPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signinUp = useSelector((state) => state.application.signinUp)
  const error = useSelector((state) => state.application.error)

  const HandleChangeName = (e) => {
    setName(e.target.value)
  }

  const HandleChangeAvatar = (e) => {
    setAvatar(e.target.value)
  }

  const HandleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const HandleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(email,password,name,avatar))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={name}
                label="Name"
                name="name"
                autoComplete="name"
                onChange={HandleChangeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={avatar}
                label="Avatar"
                name="avatar"
                autoComplete="avatar"
                onChange={HandleChangeAvatar}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                label="Email"
                name="email"
                autoComplete="email"
                onChange={HandleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={HandleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={signinUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/sign-in" variant="body2">
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
        <Typography component="p" variant="p" className={classes.error}>
          {error}
        </Typography>
      </div>
    </Container>
  );
}

export default SignupPage;