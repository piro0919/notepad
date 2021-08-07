import React from "react";
import styles from "./style.module.scss";
import FontSizeRadioButton, {
  FontSizeRadioButtonProps,
} from "components/atoms/FontSizeRadioButton";
import FontSizeSlider, {
  FontSizeSliderProps,
} from "components/atoms/FontSizeSlider";
import NotesPerRowSelect, {
  NotesPerRowSelectProps,
} from "components/atoms/NotesPerRowSelect";

export type SettingProps = {
  editorFontSize: FontSizeSliderProps["value"];
  fontSize: FontSizeRadioButtonProps["selectedValue"];
  notesPerRow: NotesPerRowSelectProps["value"];
  onAfterChangeEditorFontSize: FontSizeSliderProps["onAfterChange"];
  onChangeFontSize: FontSizeRadioButtonProps["onChange"];
  onChangeNotesPerRow: NotesPerRowSelectProps["onChange"];
  onChangeTheme: FontSizeRadioButtonProps["onChange"];
  theme: FontSizeRadioButtonProps["selectedValue"];
};

function Setting({
  editorFontSize,
  fontSize,
  notesPerRow,
  onAfterChangeEditorFontSize,
  onChangeFontSize,
  onChangeNotesPerRow,
  onChangeTheme,
  theme,
}: SettingProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filedWrapper}>
        <label htmlFor="fontSize">カラーテーマ</label>
        <FontSizeRadioButton
          name="theme"
          onChange={onChangeTheme}
          selectedValue={theme}
          values={[
            { label: "ライト", value: "light" },
            { label: "ダーク", value: "dark" },
          ]}
        />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="fontSize">文字サイズ</label>
        <FontSizeRadioButton
          name="fruit"
          onChange={onChangeFontSize}
          selectedValue={fontSize}
          values={[
            { label: "小", value: "small" },
            { label: "中", value: "medium" },
            { label: "大", value: "large" },
          ]}
        />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="fontSize">1行ごとのメモ数</label>
        <NotesPerRowSelect onChange={onChangeNotesPerRow} value={notesPerRow} />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="editorFontSize">エディターのフォントサイズ</label>
        <FontSizeSlider
          onAfterChange={onAfterChangeEditorFontSize}
          value={editorFontSize}
        />
      </div>
    </div>
  );
}

export default Setting;
