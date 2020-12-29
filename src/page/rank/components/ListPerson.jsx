import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listRank: {
    margin: "0 auto",
    "@media (min-width: 1500px)": {
      width: "50%",
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));


const ListPerson = ({ users, className, customers, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.listRank, className)} {...rest}>
      <PerfectScrollbar>
        <Box maxHeight = {400}>
          <Table>
            <TableBody>
              {users?.map((user) => (
                <TableRow hover>
                  <TableCell style={{ width: "80%" }}>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={user?.image}
                      ></Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user?.name} 
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>{user?.cups} cups</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ListPerson.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default ListPerson;
