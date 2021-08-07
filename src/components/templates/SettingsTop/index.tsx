import { useRouter } from "next/router";
import React, { useCallback } from "react";
import swal from "sweetalert";
import usePwa from "use-pwa";
import Layout from "../Layout";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";
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
>;

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
  const {
    appinstalled,
    canInstallprompt,
    enabledPwa,
    enabledUpdate,
    isPwa,
    showInstallPrompt,
    unregister,
  } = usePwa();
  const handleUpdate = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(async () => {
    const result = await unregister();

    if (result) {
      await swal({
        buttons: {
          confirm: { className: "sweet-button", text: "OK", visible: true },
        },
        icon: "success",
        text: "このページを再読み込みします",
        title: "アップデートが完了しました",
      });

      router.reload();

      return;
    }

    await swal({
      buttons: {
        confirm: { className: "sweet-button", text: "OK", visible: true },
      },
      icon: "error",
      text: "アップデート中にエラーが起きました",
      title: "アップデートに失敗しました",
    });
  }, [router, unregister]);

  return (
    <Layout>
      {({ bottomHeight, topHeight }) => {
        const height = innerHeight - (bottomHeight + topHeight);
        const style = { height: `${height}px` };

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
              <div className={styles.buttonsWrapper}>
                {!appinstalled && canInstallprompt && enabledPwa && !isPwa ? (
                  <Button onClick={showInstallPrompt}>
                    おんめも インストール
                  </Button>
                ) : null}
                {enabledUpdate && isPwa ? (
                  <Button onClick={handleUpdate}>おんめも アップデート</Button>
                ) : null}
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
