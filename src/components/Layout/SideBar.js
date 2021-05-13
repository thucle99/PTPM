import {
  Avatar, MenuItem, MenuList,
  Paper
} from "@material-ui/core";
import {
  AccountCircle,
  AddAPhoto,
  AddToQueue,
  Album,
  Apps,
  BrightnessHigh, Send
} from "@material-ui/icons";
import { useState } from "react";
import avatar from "../../img/avatar.jpg";
import firebase from "firebase";
import styles from "./SideBar.module.scss";
  
  export default function Login() {  
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <p className={styles.sidebar__header__content}>
            <span>BLE</span>
          </p>
        </div>
        <div className={styles.sidebar__content}>
          <div className={styles.profile}>
            {firebase.auth().currentUser ? (
            <Avatar
              variant="circular"
              alt="Thuc Le"
              src={firebase.auth().currentUser.photoURL}
            />
          ) : (
            <Avatar variant="circular" alt="Thuc Le" src={avatar} />
          )}
          </div>
  
          <div className={styles.navigation}>           
            <Paper className={styles.navigation__content}>
              <MenuList className={styles.menu}>
                <MenuItem className={styles.menu__item}>
                  <AccountCircle fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <Send fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <AddAPhoto
                    fontSize="small"
                    className={styles.menu__item__icon}
                  />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <AddToQueue fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <Album fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <Apps fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
                <MenuItem className={styles.menu__item}>
                  <BrightnessHigh fontSize="small" className={styles.menu__item__icon} />
                </MenuItem>
              </MenuList>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
  