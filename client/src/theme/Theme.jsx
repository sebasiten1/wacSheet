import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const colors = {
  white: '#dadce1',
  black: {
    base: '#000000',
    alpha1: 'rgba(0, 0, 0, 0.7)',
    alpha2: 'rgba(0, 0, 0, 0.5)'
  },
  orange: {
    light: '#ff8c00',
    dark: '#ff6624'
  },
  green: '#72cd94',
  red: '#e9696d',
  grey: {
    light: '#424242',
    dark: '#212529'
  }
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    common: {
      white: colors.white,
      black: colors.black.base
    },
    background: {
      paper: colors.grey.light,
      default: colors.grey.dark
    },
    primary: {
      main: colors.orange.light,
      contrastText: colors.black.alpha1
    },
    secondary: {
      main: colors.orange.dark,
      contrastText: colors.black.alpha1
    },
    error: {
      main: colors.red,
      contrastText: colors.black.alpha1
    },
    success: {
      main: colors.green,
      contrastText: colors.black.alpha1
    },
    text: {
      primary: colors.white,
      secondary: colors.black.base,
      disabled: colors.black.alpha2
    }
  }
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Theme.propTypes = {
  children: PropTypes.node.isRequired
};

export default Theme;
