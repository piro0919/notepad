import NoSSR from "@mpth/react-no-ssr";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";
import Heading1 from "components/atoms/Heading1";
import useWindowSize from "hooks/useWindowSize";

function PublicTop(): JSX.Element {
  const { innerHeight } = useWindowSize();
  const router = useRouter();
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(() => {
    router.push("/signin");
  }, [router]);

  return (
    <NoSSR>
      <div className={styles.wrapper} style={{ height: `${innerHeight}px` }}>
        <div className={styles.inner}>
          <Heading1 />
          <div className={styles.top}>
            <div className={styles.imageWrapper}>
              <img alt="girl" className={styles.image} src="/images/girl.png" />
            </div>
            <p className={styles.description}>
              おんめもは、さまざまな端末でメモを共有できるサービスです。
            </p>
            <div className={styles.buttonWrapper}>
              <Button onClick={handleClick}>使ってみる</Button>
            </div>
          </div>
          <footer className={styles.footer}>© 2021 おんめも</footer>
        </div>
      </div>
    </NoSSR>
  );
}

export default PublicTop;
