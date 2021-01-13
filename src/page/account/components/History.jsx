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
import { historyService } from '../../../services';
import '../../../assets/css/history.css'
const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));
const History = ({ username, className, ...rest }) => {
  const classes = useStyles();
  const [histories, setHistories] = React.useState();

  React.useEffect(() => {
    const getListHistory = async () => {
      await historyService.myHistory().then((response) => {
        setHistories(response?.data);
      })
    };
    getListHistory();
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
             <ItemHistory username = {username} data={element}/>
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
