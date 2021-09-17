import React, { useState, useContext } from 'react';
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

const ForgotPassword = () => {
  const classes = useStyle();
  const { forgotPassword } = useContext(ApiContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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

    // requête connexion

    forgotPassword(email)
      .then((value) => {
        alert(value.data.message);
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
                Mot de passe oublié
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="email"
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

export default ForgotPassword;
