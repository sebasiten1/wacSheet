import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  }
}));

const Register = () => {
  const classes = useStyle();
  const { userSignup } = useContext(ApiContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [emailCheck, setEmailCheck] = useState('');
  const [emailCheckError, setEmailCheckError] = useState(false);
  const [emailCheckErrorText, setEmailCheckErrorText] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordCheckErrorText, setPasswordCheckErrorText] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailCheckChange = (event) => {
    setEmailCheck(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '') {
      setEmailError(true);
      setEmailErrorText('Champ requis.');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError(true);
      setEmailErrorText("Ceci n'est pas un email.");
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }

    if (email != emailCheck) {
      setEmailCheckError(true);
      setEmailCheckErrorText('Les emails doivent être identiques.');
    } else {
      setEmailCheckError(false);
      setEmailCheckErrorText('');
    }

    if (username === '') {
      setUsernameError(true);
      setUsernameErrorText('Champ requis.');
    } else {
      setUsernameError(false);
      setUsernameErrorText('');
    }

    if (password === '') {
      setPasswordError(true);
      setPasswordErrorText('Champ requis.');
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    if (password != passwordCheck) {
      setPasswordCheckError(true);
      setPasswordCheckErrorText('Les mots de passe doivent être identiques.');
    } else {
      setPasswordCheckError(false);
      setPasswordCheckErrorText('');
    }

    function test() {
      let testErrors = [
        emailError,
        emailCheckError,
        usernameError,
        passwordError,
        passwordCheckError
      ];

      for (let element of testErrors) {
        console.log(element);
        if (element) {
          return false;
        }
      }
      return true;
    }

    // requête connexion

    if (test()) {
      userSignup(email, emailCheck, username, password, passwordCheck)
        .then((value) => {
          alert(value.data.message);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Grid container justify="center" spacing={4}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container item direction="column" alignItems="center" spacing={3}>
            <Grid item>
              <Typography variant="h2" color="textPrimary">
                Inscription
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="register-email"
                required
                type="email"
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
                id="register-email-check"
                required
                type="email"
                label="Confirmation email"
                variant="outlined"
                color="secondary"
                InputLabelProps={{ className: classes.label }}
                className={classes.textField}
                error={emailCheckError}
                helperText={emailCheckErrorText}
                onChange={handleEmailCheckChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="register-username"
                required
                label="Nom d'utilisateur"
                variant="outlined"
                color="secondary"
                InputLabelProps={{ className: classes.label }}
                className={classes.textField}
                error={usernameError}
                helperText={usernameErrorText}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="register-password"
                required
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
              <TextField
                id="register-password-check"
                required
                type="password"
                label="Confirmation mot de passe"
                variant="outlined"
                color="secondary"
                InputLabelProps={{ className: classes.label }}
                className={classes.textField}
                error={passwordCheckError}
                helperText={passwordCheckErrorText}
                onChange={handlePasswordCheckChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {"S'inscrire"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
