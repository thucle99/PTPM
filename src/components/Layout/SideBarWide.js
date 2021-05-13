import {
  MenuList,
  MenuItem,
  Typography,
  Paper,
  Avatar,
} from "@material-ui/core";
import {
  Send,
  Lens,
  AccountCircle,
  AddAPhoto,
  AddToQueue,
  Album,
  Apps,
  BrightnessHigh,
} from "@material-ui/icons";
import styles from "./SideBar.module.scss";
import avatar from "../../img/avatar.jpg";
import firebase from "firebase";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <p>
          Black<span>LEO</span>
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
          <div className={styles.profile__right}>
            <Typography variant="inherit" display="block">
              {firebase.auth().currentUser
                ? firebase.auth().currentUser.displayName
                : "Lê Trung Thực"}
            </Typography>
            <div className={styles.online}>
              <Lens className={styles.online__icon} />
              <Typography variant="inherit" display="inline">
                Online
              </Typography>
            </div>
          </div>
        </div>

        <div className={styles.navigation}>
          <p className={styles.navigation__header}> Main Navigation</p>

          <Paper className={styles.navigation__content}>
            <MenuList className={styles.menu}>
              <MenuItem className={styles.menu__item}>
                <AccountCircle
                  fontSize="small"
                  className={styles.menu__item__icon}
                />
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <Send fontSize="small" className={styles.menu__item__icon} />
                <Typography>Message</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <AddAPhoto
                  fontSize="small"
                  className={styles.menu__item__icon}
                />
                <Typography>Add photo</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <AddToQueue
                  fontSize="small"
                  className={styles.menu__item__icon}
                />
                <Typography>Video</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <Album fontSize="small" className={styles.menu__item__icon} />
                <Typography>Album</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <Apps fontSize="small" className={styles.menu__item__icon} />
                <Typography>Apps</Typography>
              </MenuItem>
              <MenuItem className={styles.menu__item}>
                <BrightnessHigh
                  fontSize="small"
                  className={styles.menu__item__icon}
                />
                <Typography>Setting</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </div>
      </div>
    </div>
  );
}
