import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from '@material-ui/core/Link';
import { userService } from '../../../services';
export default function ForgotPwd() {
  const [open, setOpen] = React.useState(false);
  const [iopen, setIOpen] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [error, setError] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIClose = () => {
    setIOpen(false);
  };

  const handleSend = async () => {
      if(!email){
          setError('Please enter your mail');
          return;
      }
      await userService.resetPassword(email).then(() => {
        setEmail();
        setOpen(false);
        setIOpen(true);
      }).catch(()=> {
          setError('Email does not exist, perhaps this email is not registered for an account');
      })
      
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Link
        component="button"
        variant="body2"
        onClick={handleClickOpen}
      >
        Forgot password ?
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">FORGOT YOUR PASSWORD</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address below.
            We will send you a email to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            fullWidth
          />
           <DialogContentText style={{color:'red'}}>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={iopen}
        onClose={handleIClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">We sent a mail to reset password for you. Please check your email to continue!</DialogTitle>
        <DialogActions>
          <Button onClick={handleIClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
