import "../../styles/globals.scss";
import "../../styles/show.scss";
import "../../styles/fonts.scss";
import "ress";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { setConfiguration } from "react-grid-system";
import { useStorageState } from "react-storage-hooks";
import { ToastContainer } from "react-toastify";
import values from "../../styles/values.module.scss";
import AuthContext from "contexts/AuthContext";
import FontSizeContext from "contexts/FontSizeContext";
import useAuth from "hooks/useAuth";
import dummyStorage from "libs/dummyStorage";

type PWAPromptProps = Partial<{
  copyAddHomeButtonLabel: string;
  copyBody: string;
  copyClosePrompt: string;
  copyShareButtonLabel: string;
  copyTitle: string;
  debug: boolean;
  delay: number;
  permanentlyHideOnDismiss: boolean;
  promptOnVisit: number;
  timesToShow: number;
}>;

const PWAPrompt = dynamic<PWAPromptProps>(
  () => import("react-ios-pwa-prompt"),
  {
    ssr: false,
  }
);

export type MyAppProps = AppProps;

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const [fontSize, setFontSize] = useStorageState(
    typeof window === "undefined" ? dummyStorage : localStorage,
    "fontSize",
    "small"
  );
  const { uid } = useAuth();

  useEffect(() => {
    const html = window.document.getElementsByTagName("html");

    if (typeof html !== "object") {
      return;
    }

    switch (fontSize) {
      case "medium": {
        html[0].style.fontSize = "75%";

        return;
      }
      case "large": {
        html[0].style.fontSize = "87.5%";

        return;
      }
      case "small":
      default: {
        html[0].style.fontSize = "62.5%";

        return;
      }
    }
  }, [fontSize]);

  useEffect(() => {
    const { lg, md, sm, xl } = values;

    setConfiguration({
      breakpoints: [
        parseInt(sm, 10),
        parseInt(md, 10),
        parseInt(lg, 10),
        parseInt(xl, 10),
      ],
      containerWidths: [
        parseInt(sm, 10) - 36,
        parseInt(md, 10) - 28,
        parseInt(lg, 10) - 32,
        parseInt(xl, 10) - 60,
      ],
      gutterWidth: 0,
      maxScreenClass: "xl",
    });
  }, []);

  useEffect(() => {
    dayjs.locale("ja");
  }, []);

  return (
    <AuthContext.Provider value={{ uid }}>
      <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
        <Component {...pageProps} />
        <PWAPrompt
          copyAddHomeButtonLabel="2) 「ホーム画面に追加」をタップします。"
          copyBody="このウェブサイトにはアプリ機能があります。ホーム画面に追加してフルスクリーンおよびオフラインで使用できます。"
          copyClosePrompt="キャンセル"
          copyShareButtonLabel="1) （四角から矢印が飛び出したマーク）をタップします。"
          copyTitle="ホーム画面に追加"
          debug={process.env.NODE_ENV === "development" && false}
        />
        <ToastContainer
          autoClose={5000}
          closeOnClick={true}
          draggable={false}
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position="bottom-right"
          rtl={false}
        />
      </FontSizeContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
