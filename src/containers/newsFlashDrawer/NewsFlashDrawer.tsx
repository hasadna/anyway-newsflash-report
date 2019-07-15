import React from "react";
import Drawer from "@material-ui/core/Drawer";
import styles from "./NewsFlashDrawer.module.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import NewsFlash from "../../components/newsFlash";

interface Props {
  handleDrawerClose: () => void;
  drawerOpen: boolean;
  lastNewsFlash: any;
  classes: any;
  newsFlashes: any[];
  newsFlashClicked: (id: number) => void;
}

const NewsFlashDrawer = (props: Props) => {
  const newsFlashes = props.newsFlashes;
  const classes = props.classes;
  // Todo - implement the news flash list with react virtualized and cellmeasurer
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.drawerOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={styles.drawerContainer}>
        <h2>התאונה האחרונה:</h2>
        {props.lastNewsFlash && (
          <NewsFlash
            item={props.lastNewsFlash}
            newsFlashClicked={props.newsFlashClicked}
            descritpion={true}
          />
        )}
      </div>
      <Divider />
      {newsFlashes.length > 0 && (
        <div>
          {newsFlashes.slice(1, newsFlashes.length).map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.allNewsFlashContainer}>
                  <NewsFlash
                    item={item}
                    newsFlashClicked={props.newsFlashClicked}
                  />
                </div>
                <Divider />
              </div>
            );
          })}
        </div>
      )}
    </Drawer>
  );
};

export default NewsFlashDrawer;
