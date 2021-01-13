import React, { useState, useEffect } from "react";
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
//import {ItemHistory} from './ItemHistory';
import {ItemHistory} from '../../../account/components/ItemHistory';
import '../../../../assets/css/history.css';
import { historyService } from '../../../../services';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));



const History = ({ className,username, ...rest }) => {
  const classes = useStyles();
  const init = [{
    roomId: "",
    winner: "",
    loser: "",
    datetime: "",
    result: null,
    draw : false,
  }]
  const [histories, setHistories] = useState(init);
  useEffect(() => {
    const getHistoryByUser = async() => {
      await historyService.adminGetByUser(username).then(function (response) {
        setHistories(response.data);
      });
    }
    getHistoryByUser();
  }, [])
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
          {histories?.map(element => (
            <>
             <ItemHistory key ={element?._id} data={element}/>
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
