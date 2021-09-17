import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  },

  paperMargin: {
    marginBottom: '25px'
  }
}));

function NavTab() {
  const classes = useStyles();
  // const location = useLocation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={`${classes.root} ${classes.paperMargin}`}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab to="/" component={Link} value={0} label="Accueil" />
        <Tab to="/register" component={Link} value={1} label="Inscription" />
        <Tab to="/login" component={Link} value={2} label="Connexion" />
      </Tabs>
    </Paper>
  );
}

export default NavTab;
