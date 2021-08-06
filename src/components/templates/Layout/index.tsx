import NoSSR from "@mpth/react-no-ssr";
import useSize from "@react-hook/size";
import React, { CSSProperties, ReactNode, useMemo, useRef } from "react";
import styles from "./style.module.scss";
import Header from "components/organisms/Header";
import Menu from "components/organisms/Menu";

export type LayoutProps = {
  children: ({
    bottomHeight,
    topHeight,
  }: {
    bottomHeight: number;
    topHeight: number;
  }) => ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const topTarget = useRef(null);
  const bottomTarget = useRef(null);
  const [, topHeight] = useSize(topTarget, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const [, bottomHeight] = useSize(bottomTarget, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const mainStyle = useMemo<CSSProperties>(
    () => ({
      paddingBottom: `${bottomHeight}px`,
      paddingTop: `${topHeight}px`,
    }),
    [bottomHeight, topHeight]
  );

  return (
    <>
      <div className={styles.headerWrapper} ref={topTarget}>
        <Header />
      </div>
      <main style={mainStyle}>
        <NoSSR>{children({ bottomHeight, topHeight })}</NoSSR>
      </main>
      <div className={styles.menuWrapper} ref={bottomTarget}>
        <Menu />
      </div>
    </>
  );
}

export default Layout;
