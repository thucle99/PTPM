import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "./InformationImg.module.scss";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import ShareIcon from "@material-ui/icons/Share";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';




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
  // function phongto(){
  //   var width = document.getElementsByClassName('anhto').width.value;
  //   console.log(width);
  //   width = width*1.2; 
  // }

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
                {/* <div className ={styles.header__left__img}> */}
                <a href="#">
                  <img
                    src={data.user.profile_image.small}
                    alt="avatar"
                    className={styles.img}
                  ></img>
                </a>
                {/* </div>
                <div className = {styles.header__left__content}> */}
                <p id="transition-modal-title">{data.user.name}</p>
                {/* </div> */}
              </div>
              <div className={styles.header__right}>
                <Button variant="outlined">
                  <AddIcon color="#367fa9" />
                </Button>
                <Button variant="outlined">
                  <FavoriteIcon color="#367fa9" />
                </Button>
                <Button variant="contained" color= "367fa9">
                  Download Free
                </Button>
              </div>
            </div>

            <div className={styles.content}>
              <img src={data.urls.small} 
              className = "anhto"
              onClick = "phongto()"
              ></img>
            </div>

            <div className={styles.more}>
              <div className={styles.more__left}>
                <div className={styles.more__left__location}>
                  <div style={{ fontSize: 40 }} className={styles.more__left__location__icon}>
                    <LocationOnOutlinedIcon color="#367fa9"  className = {styles.more__left__location__icon}/>
                  </div>
                  <div className={styles.more__left__location__content}>
                    <p>{data.user.location}</p>
                  </div>
                </div>
                <div className={styles.more__left__location}>
                  <div className={styles.more__left__location__icon}>
                    <VerifiedUserOutlinedIcon color="#367fa9"  className = {styles.more__left__location__icon}/>
                  </div>
                  <div className={styles.more__left__location__content}>
                   <a href = "https://unsplash.com/license" >
                   Free to use under the Unsplash License
                   </a>
                  </div>
                </div>
               
              </div>
              <div className={styles.more__right}>
                <Button variant="outlined">
                  <ShareIcon color="#367fa9" />
                  Share
                </Button>
                <Button variant="outlined">
                  <InfoOutlinedIcon color="#367fa9" />
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
