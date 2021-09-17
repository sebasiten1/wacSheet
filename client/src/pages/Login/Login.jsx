import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ApiContext } from '../../context/ApiContextProvider';

const useStyle = makeStyles((theme) => ({
  textField: {
    borderRadius: '4px'
  },
  paper: {
    padding: theme.spacing(6),
    width: '30vw'
  },
  label: {
    color: theme.palette.common.white
  },
  textRight: {
    textAlign: 'right'
  }
}));

const Login = () => {
  const { userSignin } = useContext(ApiContext);
  const classes = useStyle();
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;

    if (email === '') {
      errors = true;
      setEmailError(true);
      setEmailErrorText('Champ requis.');
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }

    if (password === '') {
      errors = true;
      setPasswordError(true);
      setPasswordErrorText('Champ requis.');
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    if (!errors) {
      userSignin(email, password)
        .then((result) => {
          console.log('signin request result : ', result.data);
          if (result.data) {
            if (cookies.user) {
              removeCookie('user', { sameSite: 'strict' });
            }
            setCookie('user', result.data, { sameSite: 'strict' });
            history.push('/');
          }
        })
        .catch((err) => {
          // TODO message erreur (material ui snackbar)
          console.error(err);
        });
    }
  };

  return (
    <Grid container justify="center" spacing={4}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container item direction="column" alignItems="center" spacing={5}>
            <Grid item>
              <Typography variant="h2" color="textPrimary">
                Connexion
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="connection-email"
                label="Email"
                variant="outlined"
                color="secondary"
                InputLabelProps={{ className: classes.label }}
                className={classes.textField}
                error={emailError}
                helperText={emailErrorText}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="connection-password"
                type="password"
                label="Mot de passe"
                variant="outlined"
                color="secondary"
                InputLabelProps={{ className: classes.label }}
                className={classes.textField}
                error={passwordError}
                helperText={passwordErrorText}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Se connecter
              </Button>
            </Grid>
            <Grid item>
              <Link to={'/forgot-password'}>
                <Button>Mot de passe oublié ?</Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
