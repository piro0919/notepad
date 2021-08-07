import React, { useMemo } from "react";
import styles from "./style.module.scss";
import FontSizeSlider, {
  FontSizeSliderProps,
} from "components/atoms/FontSizeSlider";
import RadioButton, { RadioButtonProps } from "components/atoms/RadioButton";
import Select, { SelectProps } from "components/atoms/Select";

export type SettingProps = {
  editorFontFamily: SelectProps["value"];
  editorFontSize: FontSizeSliderProps["value"];
  fontSize: RadioButtonProps["selectedValue"];
  notesPerRow: SelectProps["value"];
  onAfterChangeEditorFontSize: FontSizeSliderProps["onAfterChange"];
  onChangeEditorFontFamily: SelectProps["onChange"];
  onChangeFontSize: RadioButtonProps["onChange"];
  onChangeNotesPerRow: SelectProps["onChange"];
  onChangeTheme: RadioButtonProps["onChange"];
  theme: RadioButtonProps["selectedValue"];
};

function Setting({
  editorFontFamily,
  editorFontSize,
  fontSize,
  notesPerRow,
  onAfterChangeEditorFontSize,
  onChangeEditorFontFamily,
  onChangeFontSize,
  onChangeNotesPerRow,
  onChangeTheme,
  theme,
}: SettingProps): JSX.Element {
  const themeValues = useMemo<RadioButtonProps["values"]>(
    () => [
      { label: "ライト", value: "light" },
      { label: "ダーク", value: "dark" },
    ],
    []
  );
  const fontSizeValues = useMemo<RadioButtonProps["values"]>(
    () => [
      { label: "小", value: "small" },
      { label: "中", value: "medium" },
      { label: "大", value: "large" },
    ],
    []
  );
  const notesPerRowOptions = useMemo<SelectProps["options"]>(
    () => [
      { label: "自動", value: "auto" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "6", value: "6" },
      { label: "12", value: "12" },
    ],
    []
  );
  const editorFontFamilyOptions = useMemo<SelectProps["options"]>(
    () =>
      [
        {
          label: "Arial（デフォルト）",
          value: "arial, sans-serif",
        },
        { label: "Dela Gothic One", value: `'Dela Gothic One', cursive` },
        { label: "DotGothic16", value: `'DotGothic16', sans-serif` },
        { label: "Hachi Maru Pop", value: `'Hachi Maru Pop', cursive` },
        { label: "Kiwi Maru", value: `'Kiwi Maru', serif` },
        { label: "Kosugi", value: `'Kosugi', sans-serif` },
        { label: "Kosugi Maru", value: `'Kosugi Maru', sans-serif` },
        { label: "M PLUS 1p", value: `'M PLUS 1p', sans-serif` },
        {
          label: "M PLUS Rounded 1c",
          value: `'M PLUS Rounded 1c', sans-serif`,
        },
        { label: "New Tegomin", value: `'New Tegomin', serif` },
        { label: "Noto Sans JP", value: `'Noto Sans JP', sans-serif` },
        { label: "Noto Serif JP", value: `'Noto Serif JP', serif` },
        { label: "Potta One", value: `'Potta One', cursive` },
        { label: "Reggae One", value: `'Reggae One', cursive` },
        { label: "RocknRoll One", value: `'RocknRoll One', sans-serif` },
        {
          label: "Sawarabi Gothic",
          value: `'Sawarabi Gothic', sans-serif`,
        },
        {
          label: "Sawarabi Mincho",
          value: `'Sawarabi Mincho', sans-serif`,
        },
        { label: "Shippori Mincho", value: `'Shippori Mincho', serif` },
        {
          label: "Shippori Mincho B1",
          value: `'Shippori Mincho B1', serif`,
        },
        { label: "Stick", value: `'Stick', sans-serif` },
        { label: "Train One", value: `'Train One', cursive` },
        { label: "Yomogi", value: `'Yomogi', cursive` },
        { label: "Yusei Magic", value: `'Yusei Magic', sans-serif` },
      ].map(({ label, value }) => ({
        label,
        value,
        labelNode: (
          <div key={label} style={{ fontFamily: `${label}` }}>
            {label}
          </div>
        ),
      })),
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.filedWrapper}>
        <label htmlFor="theme">カラーテーマ</label>
        <RadioButton
          name="theme"
          onChange={onChangeTheme}
          selectedValue={theme}
          values={themeValues}
        />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="fontSize">文字サイズ</label>
        <RadioButton
          name="fontSize"
          onChange={onChangeFontSize}
          selectedValue={fontSize}
          values={fontSizeValues}
        />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="notesPerRow">1行ごとのメモ数</label>
        <div className={styles.notesPerRowSelectWrapper}>
          <Select
            onChange={onChangeNotesPerRow}
            options={notesPerRowOptions}
            value={notesPerRow}
          />
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="editorFontSize">エディターのフォントサイズ</label>
        <FontSizeSlider
          onAfterChange={onAfterChangeEditorFontSize}
          value={editorFontSize}
        />
      </div>
      <hr className={styles.hr} />
      <div className={styles.filedWrapper}>
        <label htmlFor="editorFontFamily">エディターのフォントタイプ</label>
        <div
          className={styles.editorFontFamilySelectWrapper}
          style={{ fontFamily: `${editorFontFamily}` }}
        >
          <Select
            onChange={onChangeEditorFontFamily}
            options={editorFontFamilyOptions}
            value={editorFontFamily}
          />
        </div>
      </div>
    </div>
  );
}

export default Setting;
