import React, { CSSProperties, useMemo, useEffect } from "react";
import { Props } from "react-firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";
import useWindowSize from "hooks/useWindowSize";

export type SignInTopProps = Pick<Props, "firebaseAuth" | "uiConfig"> & {
  setActive: (active: boolean) => void;
};

function SignInTop({
  firebaseAuth,
  setActive,
  uiConfig,
}: SignInTopProps): JSX.Element {
  const [ref, { width }] = useMeasure();
  const { innerHeight } = useWindowSize();
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${innerHeight}px`,
    }),
    [innerHeight]
  );

  useEffect(() => {
    setActive(width === 0);
  }, [setActive, width]);

  return (
    <div className={styles.wrapper} style={style}>
      <div ref={ref}>
        <StyledFirebaseAuth firebaseAuth={firebaseAuth} uiConfig={uiConfig} />
      </div>
    </div>
  );
}

export default SignInTop;
