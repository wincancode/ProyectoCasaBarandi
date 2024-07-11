import { Fab, Typography } from "@mui/material";

import styles from "./BotonSticky.module.css";
import React from "react";
import classNames from "classnames";

interface props {
  Logo: React.ReactNode;
  positionx: "left" | "right";
  positiony: "top" | "bottom";
  onClick?: () => void;
  text?: string;
}

const BotonSticky: React.FC<props> = (props) => {
  const classes = classNames({
    [styles.botonSticky]: true,
    [styles.left]: props.positionx === "left",
    [styles.right]: props.positionx === "right",
    [styles.top]: props.positiony === "top",
    [styles.bottom]: props.positiony === "bottom",
	
  });

  return (
    <div className={classes}>
      <Fab variant="extended" onClick={props.onClick} color="secondary">
        {props.Logo}
        <Typography variant="body2">{props.text}</Typography>
      </Fab>
    </div>
  );
};

export default BotonSticky;
