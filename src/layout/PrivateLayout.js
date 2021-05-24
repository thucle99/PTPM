import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Content from "../components/Layout/Content";
import Header from "../components/Layout/Header";
import SideBar from "../components/Layout/SideBar";
import SideBarWide from "../components/Layout/SideBarWide";
import Profile from "../pages/Proflie/Profile";
import styles from "./PrivateLayout.module.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - 64px)`,
      marginLeft: 64,
    },
    backgroundColor: "#3c8dbc",
    marginBottom: 30,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#3c8dbc",
    marginBottom: 30,
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    border: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: 50,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={open ? classes.appBarShift : classes.appBar}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        {open ? <SideBarWide /> : <SideBar />}
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/">
            <Content idTopic="bo8jQKTaE0Y" />
          </Route>
          <Route path="/nature">
            <Content idTopic="6sMVjTLSkeQ" />
          </Route>
          <Route path="/people">
            <Content idTopic="towJZFskpGg" />
          </Route>
          <Route path="/fashion">
            <Content idTopic="S4MKLAsBB74" />
          </Route>
          <Route path="/architecture">
            <Content idTopic="rnSKDHwwYUk" />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>
          <Router path={`/:topicId`} children={<Profile />}></Router>
        </Switch>
      </main>
    </div>
  );
}
