import React from "react";
import {
  Divider,
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Avatar,
  Box,
  Typography,
  Card,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import clsx from "clsx";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import logo from "../../../assets/image/match.png";
import Board from './Board';
import ChatHistory from './ChatHistory';
import { roomService } from '../../../services';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  password: {
    width: "100%",
    marginTop: "3%",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  root: {
    width: "100%",
  },
  matchAvatar: {
    paddingBottom: '5%',
    width: 100,
    height: 100,
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));
const MatchCard = ({iuser, idata,className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Avatar
              className={classes.matchAvatar}
              alt="Product"
              src={logo}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography variant="h3" color="textPrimary" gutterBottom>
              {(idata?.winner === iuser) ? 'WIN': 'DEFEAT'}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box style={{paddingTop:'2%'}}>
            <Typography color="textPrimary">Rival:  <AccountCircleIcon/> { (idata?.winner === iuser) ? idata.loser : idata.winner}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Box p={2}>
            <Grid container justify="space-between" spacing={2}>
              <Grid className={classes.statsItem} item>
                <AccessTimeIcon className={classes.statsIcon} color="action" />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  {idata?.createdAt}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

function ItemHistory({ username, data, className, product, ...rest }) {
  const classes = useStyles();
  const [messages, setMessages] = React.useState();
  const [value, setValue] = React.useState();
  const [index, setIndex] = React.useState();

  React.useEffect(() => {
    setIndex(data?.result?.length);
    const getMessage = async() => {
      await roomService.getRoom(data?.roomId).then((response) => {
        setMessages(response?.data?.chat);
      })
    }
    getMessage();
  }, [])
  React.useEffect(() => {
    let temp = [];
    for( let i = 0 ; i<index && i <data?.result?.length; i++) {
      temp.push(data?.result[i]);
    }
    setValue(temp);
  }, [index]);

  const handleNext = () => {
    const i = index + 1;
    setIndex(i);
  }

  const handlePre = () => {
    if(index > 0){
      const i = index - 1;
       setIndex(i);
    }
  }
  return (
    <div className={classes.password}>
      <Accordion className={clsx(classes.root, className)} {...rest}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <MatchCard iuser={username} idata ={data}/>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container>
            <Grid item xs={9} >
              <Board result = {value}/>
              <div style={{marginLeft: '40%'}}>
              <Button onClick= {handlePre}><NavigateBeforeIcon /></Button> 
              <Button  onClick ={handleNext}><NavigateNextIcon style={{marginLeft: '3%'}}/></Button> 
              </div>
            </Grid>
            <Grid item xs={3}>
              <ChatHistory messages = {messages}/>
              <Card style={{marginTop: '10%'}}>
                  <div style={{marginLeft:'3%'}}>
                  <p> Winner: {data?.winner} <span style={{color: 'green', fontSize:'bold', marginLeft:'3%'}}> X</span></p>
                    <p> Loser: {data?.loser} <span style={{color: 'gray', fontSize:'bold', marginLeft:'3%'}}> O</span></p>
                  </div>

              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
ItemHistory.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};
export { ItemHistory };
