import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const NotFound = () => {
  return (
    <Grid container align="center" direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h1" color="textPrimary">
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          {"Cette page n'existe pas."}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
