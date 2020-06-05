import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PostAdd as PostAddIcon,
  PeopleAlt as PeopleAltIcon,
  Unarchive as UnarchiveIcon,
  FileCopy as FileCopyIcon,
  SaveAlt as SaveAltIcon,
  ChromeReaderMode as ChromeReaderModeIcon,
  FeaturedPlayList as FeaturedPlayListIcon,
} from "@material-ui/icons";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link as RouterLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import NewDraft from "./subpages/NewDraft";
import ViewNews from "./subpages/ViewNews";
import DraftList from './subpages/DraftList';
import Publications from "./subpages/Publications";
import Management from "./adminpages/Management";
import Profile from "./adminpages/Profile";
import Review from "./adminpages/Review";

import TokenInfo from '../store/LoginStore';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? (
          <ListItemIcon style={{ paddingLeft: 8 }}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Main() {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  // useEffect(()=>{

  // })
  const handleLogout=()=>{
    TokenInfo.signout();

    history.push('/Login')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let match = useRouteMatch();
  return (
    <Router>
      <Box className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{flexGrow:1}}>
              新闻发布管理系统
            </Typography>
            <Button onClick={handleLogout} color="inherit">注销</Button>
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
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* <Tooltip title="发布新闻" placement="right"> */}
              <ListItemLink
                to="/new"
                primary="发布新闻"
                icon={<PostAddIcon />}
              />
            {/* </Tooltip> */}
            {/* <Tooltip title="浏览新闻" placement="right"> */}
              <ListItemLink to="/" primary="浏览新闻" icon={<FileCopyIcon />} />
            {/* </Tooltip> */}
            {/* <Tooltip title="草稿箱" placement="right"> */}
              <ListItemLink
                to="/drafts"
                primary="草稿箱"
                icon={<ChromeReaderModeIcon />}
              />
            {/* </Tooltip> */}
            {/* <Tooltip title="我的投稿" placement="right"> */}
              <ListItemLink
                to="/publication"
                primary="我的投稿"
                icon={<SaveAltIcon />}
              />
            {/* </Tooltip> */}
          </List>
          <Divider />
          <List>
            {/* <Tooltip title="人员管理" placement="right"> */}
              <ListItemLink
                to="/management"
                primary="人员管理"
                icon={<PeopleAltIcon />}
              />
            {/* </Tooltip> */}
            {/* <Tooltip title="审核新闻" placement="right"> */}
              <ListItemLink
                to="/review"
                primary="审核新闻"
                icon={<UnarchiveIcon />}
              />
            {/* </Tooltip> */}
            {/* <Tooltip title="个人资料" placement="right"> */}
              <ListItemLink
                to="/profile"
                primary="个人资料"
                icon={<FeaturedPlayListIcon />}
              />
            {/* </Tooltip> */}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={[`/new/:draftId`,'/new']} component={NewDraft}>
              
            </Route>
            <Route path={`/drafts`}>
              <DraftList />
            </Route>
            <Route path={`/publication`}>
              <Publications />
            </Route>
            <Route path={`/management`}>
              <Management />
            </Route>
            <Route path={`/review`}>
              <Review />
            </Route>
            <Route path={`/profile`}>
              <Profile />
            </Route>
            <Route path={[`/`,'/view']}>
              <ViewNews />
            </Route>
          </Switch>
        </main>
      </Box>
    </Router>
  );
}

export default Main;
