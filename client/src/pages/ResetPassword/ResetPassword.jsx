import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';

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

const ResetPassword = () => {
  const classes = useStyle();
  const { resetPassword } = useContext(ApiContext);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordCheckErrorText, setPasswordCheckErrorText] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
  };

  const token = useParams().token;

  const handleSubmit = (event) => {
    event.preventDefault();

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

    let data = { token: token, password: password, passwordCheck: passwordCheck };

    resetPassword(data)
      .then((value) => {
        console.log(value.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container justify="center" spacing={4}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container item direction="column" alignItems="center" spacing={5}>
            <Grid item>
              <Typography variant="h2" color="textPrimary">
                Réinitialiser le mot de passe
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="password"
                required
                type="password"
                label="Nouveau mot de passe"
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
                id="password-check"
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
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Réinitialiser mot de passe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
