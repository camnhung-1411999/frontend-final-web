import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    '@media (min-width: 1500px)': {
      width: "50%",
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const ListPerson = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <PerfectScrollbar> */}
      <Box >
        <Table>
          <TableBody>
            <TableRow
              hover
            >
              <TableCell>
                <Box
                  alignItems="center"
                  display="flex"
                >
                  <Avatar
                    className={classes.avatar}
                  >
                  </Avatar>
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    Minh
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                1000 cups

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

ListPerson.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default ListPerson;
