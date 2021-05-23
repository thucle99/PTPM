import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ShareIcon from "@material-ui/icons/Share";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import { Link } from "react-router-dom";
import {downloadImage} from "../../api/image"
import styles from "./InformationImg.module.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    boxShadow: theme.shadows[5],
    width: 1000,
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(1),
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function InformationImg(props) {
  const { data } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleCloseX = () => {
    props.toggle();
    setOpen(false);
  };

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
              <Link
                to={`profile?username=${data.user.username}`}
                className={styles.header__left}
              >
                <img
                  src={data.user.profile_image.small}
                  alt="avatar"
                  className={styles.img}
                ></img>
                <p id="transition-modal-title">{data.user.name}</p>
              </Link>
              <div className={styles.header__right}>
                <Button variant="outlined">
                  <AddIcon color="primary" />
                </Button>
                <Button variant="outlined">
                  <FavoriteIcon color="primary" />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => downloadImage(data.urls.raw, data.id)}
                >
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
