import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { getUser } from "../../api/user";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import styles from "./Profile.module.scss";
import { Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper_info: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    width: 900,
    alignItems: "center",
    justifyContent: "center",
    margin:"auto"

   
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    width: 900,
    marginTop: 50,
    alignItems: "left",
    

  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  let query = new URLSearchParams(useLocation().search).get("username");
  const classes = useStyles();

  const [user, setUser] = useState("");
  useEffect(() => {
    getUser(query).then((res) => {
      console.log("data", res.data);
      console.log(res.data.profile_image.small);
      setUser(res.data);
    });
  }, []);
  // const [value, setValue] = React.useState(2);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const [value, setValue] = React.useState(0);

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
                  color="#367fa9"
                  className={
                    styles.infomation__content__location__icon__location
                  }
                />
              </div>
              <div className={styles.infomation__content__location__content}>
                <p>{user.location}</p>
              </div>
            </div>
            <div className={styles.infomation__content__interest}>
              <p>Interest</p>
              <div className={styles.infomation__content__interest}>
                <Button
                  variant="contained"
                  className="styles.infomation__content__interest__item"
                >
                  Mountain Images and Pictures
                </Button>
                <Button
                  variant="contained"
                  className="styles.infomation__content__interest__item"
                >
                  HD Wallpapers
                </Button>
                <Button
                  variant="contained"
                  className="styles.infomation__content__interest__item"
                >
                  Street
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.paper}>
        <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab icon={< PhotoOutlinedIcon/> } label="Photo" {...a11yProps(0)} />
          <Tab label="Like" icon={<FavoriteOutlinedIcon />} {...a11yProps(1)} />
          <Tab label="Collection" icon={<CollectionsBookmarkRoundedIcon />} {...a11yProps(2)} />
          
          {/* <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
          <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
          <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
          <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
     
    </div>
        </div>
      </div>
    </div>
  );
}
