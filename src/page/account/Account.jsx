import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Breadcrumb, Page } from "../../components";
import { Profile, ProfileDetails, Password, History } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../actions";
import { List, Divider } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import '../../assets/css/profile.css';
import rank from '../../helpers/rank/master.png'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    marginTop: '17%',
    marginLeft: '10%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    position: 'absolute',
    top: 5
  },
  list: {
    width: "100%",
    maxWidth: 360,
    border: "1px solid #ccc",
    marginTop: '10%',
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Account = () => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.iprofile);
  useEffect(() => {
    dispatch(userActions.profile());
  }, [user]);

  const handleComponent = () => {
    if (index === 1) {
      return (
        <ProfileDetails />
      )
    }
    if(index === 2) {
      return (<History/>)
    }
    return (
      <>
      <Password/>
      <Password/>
      <Password/>
      <Password/></>
    )
  }
  return (
 
      <div>
    <img className="image" src="https://image.winudf.com/v2/image1/bmV0Lm5leHRsZXZlbG1vYmlsZWFwcHMubWluaV93b3JsZF93YWxscGFwZXJzX3NjcmVlbl85XzE1NjgyNTQxNjZfMDY1/screen-10.jpg?fakeurl=1&type=.jpg" style={{width: "100%"}} alt="..." />


      <Page className={classes.root} title="Profile">
      
      <Container maxWidth="lg">
        <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
            <Profile/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
          </Grid>
          <Grid item lg={4} md={6} xs={12} style={{textAlign: 'center'}}>
          <div style={{marginTop: '10%'}}>
            <img style={{width:'30%', height:'30%'}} src={rank}/>
            <h2 style={{color: 'rgb(245, 139, 0)', fontStyle: 'bold'}}> MASTER</h2>
            </div>
          <List
              component="nav"
              className={classes.list}
              aria-label="contacts"
            >
              <ListItem button onClick={()=>{setIndex(1)}}>
                <PermIdentityIcon/>
                <ListItemText inset primary="Detail profile" />
              </ListItem>
              <Divider component="li" />
              <ListItem button onClick={()=>{setIndex(2)}}>
                <HistoryIcon/>
                <ListItemText inset primary="History" />
              </ListItem>
              <Divider component="li" />
              <ListItem button onClick={()=>{setIndex(3)}}>
              <SettingsIcon/>
                <ListItemText inset primary="Setting" />
              </ListItem>
            </List>
           
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
          {handleComponent()}
          </Grid>
        
        </Grid>
      </Container>
    </Page>

      </div>
    
  );
};

export { Account };
