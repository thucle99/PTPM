import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ShareIcon from "@material-ui/icons/Share";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import React, { useEffect, useState } from "react";
import styles from "./InformationImg.module.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: 1000,
    height: 600,
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(1),
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const options = ["Small", "Medium", "Large"];
export default function InformationImg(props) {
  const { data } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleOpen = () => {
    props.toggle();
    setOpen(true);
  };

  const handleCloseX = () => {
    props.toggle();

    setOpen(false);
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    console.log("props", props.data);
  });

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseX}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={styles.header}>
              <div className={styles.header__left}>
                <a href="#">
                  <img
                    src={data.user.profile_image.small}
                    alt="avatar"
                    className={styles.img}
                  ></img>
                </a>
                <p id="transition-modal-title">{data.user.name}</p>
              </div>
              <div className={styles.header__right}>
                <Button variant="outlined">
                  <AddIcon color="primary" />
                </Button>
                <Button variant="outlined">
                  <FavoriteIcon color="primary" />
                </Button>
                <Button variant="contained" color="primary">
                  Download Free
                </Button>
              </div>
            </div>

            <div className={styles.content}>
              <img
                src={data.urls.small}
                className="anhto"
                onClick="phongto()"
              ></img>
            </div>

            <div className={styles.more}>
              <div className={styles.more__left}>
                <div className={styles.more__left__location}>
                  <div
                    style={{ fontSize: 40 }}
                    className={styles.more__left__location__icon}
                  >
                    <LocationOnOutlinedIcon
                      color="#367fa9"
                      className={styles.icon__location}
                    />
                  </div>
                  <div className={styles.more__left__location__content}>
                    <p>{data.user.location}</p>
                  </div>
                </div>
                <div className={styles.more__left__location}>
                  <div className={styles.more__left__location__icon}>
                    <VerifiedUserOutlinedIcon
                      color="#367fa9"
                      className={styles.more__left__location__icon}
                    />
                  </div>
                  <div className={styles.more__left__location__content}>
                    <a href="https://unsplash.com/license">
                      Free to use under the Unsplash License
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.more__right}>
                <Button variant="outlined">
                  <ShareIcon color="primary" />
                  Share
                </Button>
                <Button variant="outlined">
                  <InfoOutlinedIcon color="primary" />
                  Info
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
