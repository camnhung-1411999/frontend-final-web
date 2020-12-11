import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {UserService} from '../../services';
import Online from "../../socket/Online";


function createData(name) {
  return { name,};
}


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function DashBoard() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { messages, sendMessage } = Online(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("ssss")
    sendMessage('Minh');
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);

    console.log("ssss")
    sendMessage('Minh');
  };

  useEffect(() => {

    async function getUserOnline(){
      await UserService.getUserOnline().then((reponsive)=>{
        console.log('data',reponsive.data)
      })
    }
    getUserOnline();
  }, []);

  return (
    <div className="dashBoard">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={3}>
            <div className="plus">
              <i class="fas fa-plus "></i>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className={classes.search}
              style={{
                borderBottom: "1px solid",
                width: "17em",
                color: "rgb(133, 182, 247)",
                marginTop: '6%',
                marginLeft: 'auto'
              }}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Enter ID room"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            
          </Grid>
          <Grid item xs={3}>
            <button style={{
                width: "5em",
                height: "2em",
                color: "rgb(133, 182, 247)",
                marginTop: '8%',
                marginRight: 'auto',
                border: '1px solid ',
                backgroundColor:'rgb(133, 182, 247)',
                color: "#fff",
                borderRadius:'0.1em'
              }} className="custom">
                Join
              </button>
          </Grid>
        </Grid>
      </Grid>
      <div className="inline">
        <p className="ibr"></p>
      </div>

      <div className="main">
        <Rooms />
      </div>
      <Online />
    </div>
  );
}
export { DashBoard };
