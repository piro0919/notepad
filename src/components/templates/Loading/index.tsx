import noScroll from "no-scroll";
import React, { useEffect } from "react";
import LoadingOverlay, { LoadingOverLayProps } from "react-loading-overlay-ts";
import styles from "./style.module.scss";

export type LoadingProps = Pick<LoadingOverLayProps, "active">;

function Loading({ active }: LoadingProps): JSX.Element {
  useEffect(() => {
    if (active) {
      noScroll.on();
    } else {
      noScroll.off();
    }

    return () => {
      noScroll.off();
    };
  }, [active]);

  return <LoadingOverlay active={active} className={styles.wrapper} />;
}

export default Loading;
