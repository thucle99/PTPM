import {
  Grid,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "lightgallery.js/dist/css/lightgallery.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InformationImg from "../InformationImg/InformationImg";
import styles from "./ListImg.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function ListImg(props) {
  const { item } = props;
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  const onClickImg = () => {
    setVisible(true);
  };
  const toggle = () => {
    setVisible(false);
  };

  const titleBar = (img, name,username) => (
    <Link to={`profile?username=${username}`} className={styles.information}>
      <img src={img} />
      <span>{name}</span>
    </Link>
  );
  return (
    <Grid item sm={6} lg={4} className={styles.main}>
      <GridListTile key={item.id}>
        <img
          src={item.urls.small}
          alt={item.description}
          onClick={() => onClickImg(item)}
          className={styles.img}
        />
        <GridListTileBar
          title={titleBar(item.user.profile_image.small, item.user.name,item.user.username)}
          actionIcon={
            <IconButton
              aria-label={`info about ${item.description}`}
              className={classes.icon}
            >
              <p className={styles.react}>{item.likes}</p>
              <FavoriteIcon />
            </IconButton>
          }
        ></GridListTileBar>
      </GridListTile>
      {visible == true && <InformationImg toggle={toggle} data={item} />}
    </Grid>
  );
}
