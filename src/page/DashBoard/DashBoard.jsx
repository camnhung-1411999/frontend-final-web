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

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
];

function createData(name) {
  return { name,};
}

const rows = [
  // createData('Pham Minh'),
  // createData('Nhung'),
];

const useStyles = makeStyles({
  root: {
    maxWidth: '1000px',
    margin: 'auto',
    left: '1%',
    right: '1%',
    marginTop: 50,
    position: 'absolute',

  },
  container: {
    maxHeight: 440,
  },
});

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
  }, [])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export {DashBoard};