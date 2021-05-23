import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Button,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  NotificationsNone,
  Settings,
  ExitToApp,
  Home,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import firebase from "firebase";
import { getListTopic } from "../../api/topic";
import styles from "./Header.module.scss";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Header(props) {
  const [listTopic, setListTopic] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(true);
  };
  const handleSuccess = () => {
    setOpen(false);
    firebase.auth().signOut();
  };

  return (
    <div className={styles.header}>
      <Grid container spacing={3} className={styles.header}>
        <Grid item xs={2} className={styles.header__item}>
          <Link to="/">
            <Home />
          </Link>
        </Grid>
        <Grid item xs={2} className={styles.header__item}>
          <Link to="/nature">Nature</Link>
        </Grid>
        <Grid item xs={2} className={styles.header__item}>
          <Link to="/people">People</Link>
        </Grid>
        <Grid item xs={2} className={styles.header__item}>
          <Link to="/fashion">Fashion</Link>
        </Grid>
        <Grid item xs={2} className={styles.header__item}>
          <Link to="/architecture">Architecture</Link>
        </Grid>
        <Grid
          className={styles.header__item}
          item
          xs={2}
          onClick={handleClickOpen}
        >
          <ExitToApp />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Bạn có chắc muốn đăng xuất ?</DialogContentText>
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
