import noScroll from "no-scroll";
import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import LoadingOverlay, { LoadingOverLayProps } from "react-loading-overlay-ts";
import styles from "./style.module.scss";

export type QrCodeProps = Pick<LoadingOverLayProps, "active" | "onClick">;

function QrCode({ active, onClick }: QrCodeProps): JSX.Element {
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

  return (
    <LoadingOverlay
      active={true}
      className={styles.wrapper}
      onClick={onClick}
      spinner={null}
    >
      <div className={styles.inner}>
        <div>
          <QRCode size={150} value="https://on-memo.kk-web.link" />
          <div>Webサイト</div>
        </div>
        <div>
          <QRCode
            size={150}
            value="https://play.google.com/store/apps/details?id=link.kk_web.on_memo.twa"
          />
          <div>Google Play ストア</div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default QrCode;
