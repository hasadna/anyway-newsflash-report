import React, { useState, useEffect } from "react";
import Map from "../map";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { getNewsFlash, getNewsFlashes } from "../../api/mocks";
import NewsFlashDrawer from "../newsFlashDrawer";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    direction: "rtl"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {}
}));

const App = () => {
  useEffect(() => {
    getNewsFlashesData();
  }, []);
  const [newsFlashes, setNewsFlashes] = useState([]);
  const [lastNewsFlash, setLastNewsFlash] = useState<any>(null);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  async function getNewsFlashesData() {
    const newsFromApi: any[] = await getNewsFlashes();
    let lastFlash: any = null;
    if (newsFromApi.length > 0) {
      lastFlash = await getNewsFlash(newsFromApi[0].id);
    }
    setNewsFlashes(newsFromApi as any);
    setLastNewsFlash(lastFlash);
  }

  function createMarkerTooltip(id: number) {
    return async (e: L.LeafletMouseEvent) => {
      const newsFlashObj: any = await getNewsFlash(id);
      e.target.bindPopup(newsFlashObj.description).openPopup();
    };
  }

  const newsFlashesMarkers = newsFlashes.map(
    (newsFlash: any, index: number) => {
      return {
        id: newsFlash.id,
        position: [newsFlash.lat, newsFlash.lon],
        onclick: createMarkerTooltip(newsFlash.id)
      };
    }
  );

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Map newsFlashesMarkers={newsFlashesMarkers} />
        </main>
        <NewsFlashDrawer
          classes={classes}
          handleDrawerClose={handleDrawerClose}
          drawerOpen={drawerOpen}
          lastNewsFlash={lastNewsFlash}
          newsFlashes={newsFlashes}
        />
      </div>
    </div>
  );
};

export default App;
