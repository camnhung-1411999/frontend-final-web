import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { history } from '../helpers';
import { userService } from '../services';
const useStyles = makeStyles(({
  root: {}
}));

const ResetPassword = ({ match, className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    password: null,
    confirm: null
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleHome =() => {
      history.push('/');
  }

  const handleReset = async () => {
      if(!values.password || !values.confirm){
          setError('* Please enter all field');
          return;
      }

      if(values.password !== values.confirm) {
          setError('* Confirm password wrong');
          return;
      }
      await userService.updatePwd({
          password: values.password,
          user: match.params.user,
      }).then(()=> {
          setOpen(true);
      })
      
  }
  return (
    <div>
        <form
    style={{width: '60%', margin: '5% auto'}}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader style={{textAlign: 'center'}}
          subheader="Enter new password below"
          title="RESET NEW PASSWORD"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
          <p style={{color: 'red', fontSize: '0.8em'}}>{error}</p>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </Card>
    </form>

    <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">RESET PASSWORD SUCCESS!</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Let login to join the game with us!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{setOpen(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={handleHome} color="primary" autoFocus>
          Go to the website
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
};

ResetPassword.propTypes = {
  className: PropTypes.string
};

export {ResetPassword};
