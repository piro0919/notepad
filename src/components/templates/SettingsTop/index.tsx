import { useRouter } from "next/router";
import React, { useCallback } from "react";
import swal from "sweetalert";
import Layout from "../Layout";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";
import Application, {
  ApplicationProps,
} from "components/organisms/Application";
import Setting, { SettingProps } from "components/organisms/Setting";
import useWindowSize from "hooks/useWindowSize";

export type SettingsTopProps = Pick<
  SettingProps,
  | "editorFontFamily"
  | "editorFontSize"
  | "fontSize"
  | "notesPerRow"
  | "onAfterChangeEditorFontSize"
  | "onChangeEditorFontFamily"
  | "onChangeFontSize"
  | "onChangeNotesPerRow"
  | "onChangeTheme"
  | "theme"
> &
  Pick<ApplicationProps, "onDisplayQrCode" | "setActive">;

function SettingsTop({
  editorFontFamily,
  onChangeEditorFontFamily,
  editorFontSize,
  fontSize,
  notesPerRow,
  onAfterChangeEditorFontSize,
  onChangeFontSize,
  onChangeNotesPerRow,
  onChangeTheme,
  onDisplayQrCode,
  setActive,
  theme,
}: SettingsTopProps): JSX.Element {
  const router = useRouter();
  const handleClick = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(async () => {
    const result = await swal({
      buttons: {
        cancel: {
          className: "sweet-button",
          text: "キャンセル",
          visible: true,
        },
        confirm: { className: "sweet-button", text: "OK", visible: true },
      },
      icon: "info",
      text: "本当にサインアウトしますか？",
      title: "サインアウトする",
    });

    if (!result) {
      return;
    }

    await router.push("/signout");
  }, [router]);
  const { innerHeight } = useWindowSize();

  return (
    <Layout>
      {({ bottomHeight, topHeight }) => {
        const height = innerHeight - (bottomHeight + topHeight);
        const style = { minHeight: `${height}px` };

        return (
          <div className={styles.wrapper} style={style}>
            <div className={styles.inner}>
              <Setting
                editorFontFamily={editorFontFamily}
                editorFontSize={editorFontSize}
                fontSize={fontSize}
                notesPerRow={notesPerRow}
                onAfterChangeEditorFontSize={onAfterChangeEditorFontSize}
                onChangeEditorFontFamily={onChangeEditorFontFamily}
                onChangeFontSize={onChangeFontSize}
                onChangeNotesPerRow={onChangeNotesPerRow}
                onChangeTheme={onChangeTheme}
                theme={theme}
              />
              <Application
                onDisplayQrCode={onDisplayQrCode}
                setActive={setActive}
              />
              <div className={styles.buttonWrapper}>
                <Button onClick={handleClick}>サインアウト</Button>
              </div>
            </div>
          </div>
        );
      }}
    </Layout>
  );
}

export default SettingsTop;
