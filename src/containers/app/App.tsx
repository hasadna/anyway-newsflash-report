/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import Map from "../map";
import clsx from "clsx";
import styles from "./App.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { getNewsFlash, getNewsFlashes } from "../../api/mocks";
import NewsFlashDrawer from "../newsFlashDrawer";
import { LatLng } from "leaflet";
import * as ReactDOMServer from "react-dom/server";

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
  logo: {
    height: "30px",
    marginRight: "auto"
  },
  content: {}
}));

const App = () => {
  const leafletRef = useRef(null);
  useEffect(() => {
    getNewsFlashesData();
  }, []);
  const [newsFlashes, setNewsFlashes] = useState<any[]>([]);
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

  function getMarkerPopup(item: any) {
    return ReactDOMServer.renderToStaticMarkup(
      <div className={styles.markerPopupContainer}>
        {Object.keys(item).map((key, index) => {
          return (
            <div key={index} className={styles.makerPopupPropertyContainer}>
              <div className={styles.markerKey}>{key}</div>
              <div className={styles.markerValue}>
                {key === "link" ? (
                  <a href={item[key]} target="_blank">
                    {item[key]}
                  </a>
                ) : (
                  item[key]
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function createMarkerTooltip(id: number) {
    return async (e: L.LeafletMouseEvent) => {
      const newsFlashObj: any = await getNewsFlash(id);
      e.target.bindPopup(getMarkerPopup(newsFlashObj)).openPopup();
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

  function newsFlashClicked(id: number) {
    const item = newsFlashes.find(n => n.id === id);
    //@ts-ignore
    leafletRef.current.contextValue.map.setView(
      new LatLng(item.lat, item.lon),
      18
    );
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
            <img src="/anyway.png" alt="Anyway" className={classes.logo} />
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Map newsFlashesMarkers={newsFlashesMarkers} ref={leafletRef} />
        </main>
        <NewsFlashDrawer
          classes={classes}
          handleDrawerClose={handleDrawerClose}
          drawerOpen={drawerOpen}
          lastNewsFlash={lastNewsFlash}
          newsFlashes={newsFlashes}
          newsFlashClicked={newsFlashClicked}
        />
      </div>
    </div>
  );
};

export default App;
