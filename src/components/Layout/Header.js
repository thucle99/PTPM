import { Grid,Dialog,DialogActions,DialogContent,DialogContentText,Paper,Button } from "@material-ui/core";
import { NotificationsNone, Settings, ExitToApp, Home } from "@material-ui/icons";
import styles from "./Header.module.scss";
import { useState} from "react";
import Draggable from 'react-draggable';
import firebase from "firebase";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function Header(props) {
  const [open, setOpen] =useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(true);
  };
  const handleSuccess = () => {
    setOpen(false);
    firebase.auth().signOut()
  };
  return (
    <div className={styles.header}>
        <Grid container spacing={3} className={styles.header}>
          <Grid item xs={3}> <Home /></Grid>
          <Grid item xs={3}> <NotificationsNone /></Grid>
          <Grid item xs={3}><Settings /></Grid>
          <Grid item xs={3} onClick={handleClickOpen}><ExitToApp /></Grid>
        </Grid>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn đăng xuất ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSuccess} color="primary">
            Đăng Xuất
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
