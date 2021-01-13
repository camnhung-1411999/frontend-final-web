import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab , Typography, Box} from '@material-ui/core';
import ChatOnline from './ChatOnline'
import { roomService } from '../../../../../services';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: "5vh",
  },
}));
function TabChat({roomId}) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [messages, setMessages] = useState();
  useEffect(() => {
    const getMessage = async () => {
      await roomService.getRoom(roomId).then((response) => {
        setMessages(response?.data?.chat);
        console.log('===chat',response?.data?.chat);
      })
    };
    getMessage();

  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Chat" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <ChatOnline messages ={messages}/>
      </TabPanel>
  
    </div>
  );
}

export {TabChat} 