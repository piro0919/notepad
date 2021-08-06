import NoSSR from "@mpth/react-no-ssr";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { CSSProperties, useCallback, useMemo } from "react";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";
import useWindowSize from "hooks/useWindowSize";

function NotFoundTop(): JSX.Element {
  const { innerHeight } = useWindowSize();
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${innerHeight}px`,
    }),
    [innerHeight]
  );
  const router = useRouter();
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(() => {
    router.push("/");
  }, [router]);

  return (
    <NoSSR>
      <div className={styles.wrapper} style={style}>
        <div className={styles.inner}>
          <div className={styles.imageWrapper}>
            <Image alt="cat" layout="fill" src="/images/cat1.png" />
          </div>
          <p className={styles.description}>404 NOT FOUND</p>
          <div className={styles.buttonWrapper}>
            <Button onClick={handleClick}>戻る</Button>
          </div>
        </div>
      </div>
    </NoSSR>
  );
}

export default NotFoundTop;
