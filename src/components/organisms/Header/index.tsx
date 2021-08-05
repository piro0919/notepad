import React from "react";
import Menu from "../Menu";
import styles from "./style.module.scss";

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  );
}

export default Header;
