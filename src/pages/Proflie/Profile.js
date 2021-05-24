import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getImageByUser } from "../../api/image";
import { getUser } from "../../api/user";
import ListImg from "../../components/ListImg/ListImg";
import styles from "./Profile.module.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper_info: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    width: 1000,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    width: 1200,
    marginTop: 50,
    alignItems: "left",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  let query = new URLSearchParams(useLocation().search).get("username");
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [listImg, setListImg] = useState([]);
  const [listImgLike, setListImgLike] = useState([]);

  const getData = (page) => {
    getImageByUser(query, page).then((res) => {
      setIsFetching(false);
      setListImg([...listImg, ...res.data]);
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100 ||
      isFetching
    ) {
      setIsFetching(true);
    }
    return;
  };

  useEffect(() => {
    getUser(query).then((res) => {
      const imgLike = res.data.tags.aggregated
        .filter((item) => item.source)
        .map((item) => item.source.cover_photo);
      setListImgLike(imgLike);
      setUser(res.data);
    });
    getData(page);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getData(page + 1);
    setPage(page + 1);
  }, [isFetching]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.paper_info}>
        <div className={styles.infomation}>
          <div className={styles.infomation__avatar}>
            <img
              src={user ? user.profile_image.large : ""}
              alt="avatar"
              className={styles.infomation__avatar}
            ></img>
          </div>
          <div className={styles.infomation__content}>
            <div className={styles.infomation__content__name}>
              <h1>{user.last_name}</h1>
              <Button variant="outlined">
                <PersonAddIcon color="primary" />
              </Button>
              <Button variant="outlined">
                <EmailOutlinedIcon color="primary" />
              </Button>
            </div>
            <div>
              <p>
                Download free, beautiful high-quality photos curated by Jules.
              </p>
            </div>
            <div
              style={{ fontSize: 40 }}
              className={styles.infomation__content__location}
            >
              <div className={styles.infomation__content__location__icon}>
                <LocationOnOutlinedIcon
                  color="primary"
                  className={
                    styles.infomation__content__location__icon__location
                  }
                />
              </div>
              <div className={styles.infomation__content__location__content}>
                <p>{user.location}</p>
              </div>
            </div>
            <div>
              <p>Interest</p>
              <div className={styles.infomation__content__interest}>
                <Button
                  variant="contained"
                  className={styles.infomation__content__interest__item}
                >
                  Mountain Images and Pictures
                </Button>
                <Button
                  variant="contained"
                  className={styles.infomation__content__interest__item}
                >
                  HD Wallpapers
                </Button>
                <Button
                  variant="contained"
                  className={styles.infomation__content__interest__item}
                >
                  Street
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.app__bar}>
          <AppBar
            position="static"
            color="default"
            className={styles.main__tab}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab label={`Photo  ${user.total_photos}`} {...a11yProps(0)} />
              <Tab label={`Like ${user.total_likes}`} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container spacing={1} className={styles.content}>
              {listImg &&
                listImg.map((item, index) => (
                  <ListImg key={index} item={item} />
                ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={1} className={styles.content}>
              {listImgLike &&
                listImgLike.map((item, index) => (
                  <ListImg key={index} item={item} />
                ))}
            </Grid>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
