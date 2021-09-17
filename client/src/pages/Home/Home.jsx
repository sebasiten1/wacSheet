import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(6),
    width: '30vw'
  },
  button: {
    width: '210px'
  },
  textField: {
    borderRadius: '4px',
    width: '210px'
  },
  label: {
    color: theme.palette.common.white
  }
}));

const Home = () => {
  const classes = useStyle();

  return (
    <Grid container justify="center" spacing={4}>
      <Paper className={classes.paper}>
        <Grid container item direction="column" align="center" alignItems="center" spacing={10}>
          <Grid item>
            <Typography variant="h2" color="textPrimary">
              Wacsheet
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              Un petit gestionnaire de fiche de personnage pour jeu de rôle.
            </Typography>
            {/* </Grid>
          <Grid container item direction="column" alignItems="center" spacing={3}>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.button}>
                Creer une partie
              </Button>
            </Grid>
            <Grid container item direction="column" alignItems="center" spacing={1}>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button}>
                  Rejoindre une partie
                </Button>
              </Grid>
              <Grid item>
                <TextField
                  label="Code de la partie"
                  variant="outlined"
                  color="secondary"
                  InputLabelProps={{ className: classes.label }}
                  className={classes.textField}
                />
              </Grid>
          </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Home;
