import styles from "./Content.module.scss";
import { useState, useEffect } from "react";
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { getListImage } from "../../api/image";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from "axios";


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
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const getData = (page) => {
    getListImage(page).then((res) => {
      console.log("res", res.data);
      console.log("page", page);
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
  
  const download = (urlImage,idImage) =>  {
    console.log(urlImage);
    axios({
      url: urlImage, 
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', idImage+'.jpg'); //or any other extension
       document.body.appendChild(link);
       link.click();
    });
    
  };
  // return (
  //   <div className="App">
  //     <a
  //       href="https://unsplash.com/photos/VGDaRSGZbww/download"
  //       download
  //       onClick={() => download()}
  //     >
  //       <i className="fa fa-download" />
  //       download
  //     </a>
  //   </div>
  // );

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
    // <LightgalleryProvider className={styles.header}>
    //   <Grid container spacing={1} className={styles.content}>
    //     {listImg.map((item, index) => (
    //       <Grid item sm={6} lg={4} key={index}>
    //         <LightgalleryItem group="1" src={item.urls.small} >
    //         <img src={item.urls.small} className={styles.img} />
    //       </LightgalleryItem>
    //       </Grid>
    //     ))}
    //   </Grid>
    //   {isFetching || (
    //     <Grid container spacing={1}>
    //       <Grid item sm={6} lg={4}>
    //         <Skeleton variant="rect" width={350} height={240} />
    //       </Grid>
    //       <Grid item sm={6} lg={4}>
    //         <Skeleton variant="rect" width={350} height={240} />
    //       </Grid>
    //       <Grid item sm={6} lg={4}>
    //         <Skeleton variant="rect" width={350} height={240} />
    //       </Grid>
    //     </Grid>
    //   )}
    // </LightgalleryProvider>

    <div className={classes.root}>
      <LightgalleryProvider className={styles.header}>
        <Grid container spacing={1} className={styles.content}>
          {listImg.map((item, index) => (
            <Grid item sm={6} lg={4} key={index} className={styles.main}>
              <GridListTile key={item.id}  >
              <LightgalleryItem group="1" src={item.urls.small}>
                <img src={item.urls.small} className={styles.img} />
              </LightgalleryItem>
                <GridListTileBar
                  title={item.description}
                  subtitle={<span>by: {item.user.name}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${item.description}`} className={classes.icon}>
                      <StarBorderIcon  className={classes.unstar} onClick={() => download(item.urls.raw,item.id)}/>
                    </IconButton>
                  }
                />
              </GridListTile>
            </Grid>
          ))}
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
      </LightgalleryProvider>
    </div>
  );
}
