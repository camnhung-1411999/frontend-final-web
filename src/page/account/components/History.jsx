import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import {ItemHistory} from './ItemHistory';
import '../../../assets/css/history.css'
const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));
const data = [{
  winner: 'Nhung',
  loser: 'Nhi',
  createdAt: '3:25 20/12/2020',
  match: [
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
      null,null,null,null,null,null,null,null,null,null,null,null,
      null,null,null,null,null,null,null,null,null,
      'X','O',null,'O', null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'X',null,null,'O', null,null,null,
      null,null,null,null,null,'O','X','O', null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
      null,null,null,null,null,null,'X','O','X','O', null,null,null,null,null,'X',null,'O', null,null,null,null,null,
      null,null,'X','O',null,'O', null,null, null, null, null, 'X','0',null,'O', null,null,'O', null,null, null, null, null, null,null, 'X','0',null,'O', null,null,null,null,
       null, null, null, null,null,'0',null,'O', null,null,null,null,
        null, null, null, 'O',null,'X',null,'O', null],
    [],
    [],
    [],
  ],
  messages: [
    {message: "Hello", ownl: true},
    {message: "How are u", ownl: true},
    {message: "1111", ownl: false},
    {message: "1111", ownl: true},
    {message: "Nothing", ownl: false},
    {message: "1111", ownl: true},
    {message: "Hihi", ownl: false},
    {message: "1111", ownl: true},
  ],
}]
const History = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="Display detail your history" title="HISTORY" />
        <Divider />
        <CardContent>
          {data?.map(element => (
            <>
             <ItemHistory data={element}/>
             <ItemHistory data={element}/>
             <ItemHistory data={element}/>
             <ItemHistory data={element}/>
             <ItemHistory data={element}/>
             </>
          ))}
         
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
        </Box>
      </Card>
    </form>
  );
};

History.propTypes = {
  className: PropTypes.string,
};

export { History };
