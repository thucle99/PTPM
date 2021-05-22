import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import "lightgallery.js/dist/css/lightgallery.css";
import { useEffect, useState } from "react";
import { getListImage } from "../../api/image";
import InformationImg from "./InformationImg/InformationImg";
import ListImg from "./ListImg/ListImg";
import styles from "./Content.module.scss";

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

export default function Content() {
  const [listImg, setListImg] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const getData = (page) => {
    getListImage(page).then((res) => {
      setIsFetching(false);
      setListImg([...listImg, ...res.data]);
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.scrollHeight ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    getData(page);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getData(page + 1);
    setPage(page + 1);
  }, [isFetching]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={styles.content}>
        {listImg &&
          listImg.map((item, index) => <ListImg key={index} item={item} />)}
      </Grid>
      {isFetching || (
        <Grid container spacing={1}>
          <Grid item sm={6} lg={4}>
            <Skeleton variant="rect" width={350} height={240} />
          </Grid>
          <Grid item sm={6} lg={4}>
            <Skeleton variant="rect" width={350} height={240} />
          </Grid>
          <Grid item sm={6} lg={4}>
            <Skeleton variant="rect" width={350} height={240} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
