import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import DashboardLayout from './DashboardLayout';
const AdminBoard = () => {
  return (
    <ThemeProvider theme={theme}>
    <DashboardLayout/>
    </ThemeProvider>
  );
};

export {AdminBoard};