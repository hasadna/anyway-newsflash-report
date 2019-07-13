import React from "react";
import Drawer from "@material-ui/core/Drawer";
import styles from "./NewsFlashDrawer.module.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";

interface Props {
  handleDrawerClose: () => void;
  drawerOpen: boolean;
  lastNewsFlash: any;
  classes: any;
  newsFlashes: any[];
}

const NewsFlashDrawer = (props: Props) => {
  const newsFlashes = props.newsFlashes;
  const classes = props.classes;

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
          <div className={styles.lastNewsFlashContainer}>
            <div className={styles.lastNewsFlashSource}>
              {props.lastNewsFlash.source}
            </div>
            <div className={styles.lastNewsFlashContent}>
              <div className={styles.lastNewsFlashTitle}>
                {props.lastNewsFlash.title}
              </div>
              <div>{props.lastNewsFlash.description}</div>
            </div>
          </div>
        )}
      </div>
      <Divider />
      {newsFlashes.length > 0 && (
        <div>
          {newsFlashes.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.allNewsFlashContainer}>
                  <div className={styles.lastNewsFlashSource}>
                    {item.source}
                  </div>
                  <div className={styles.lastNewsFlashContent}>
                    <div>{item.title}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Drawer>
  );
};

export default NewsFlashDrawer;
