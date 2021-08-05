import React, { useEffect } from "react";
import useForceUpdate from "use-force-update";
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
};

function Setting({
  editorFontSize,
  fontSize,
  notesPerRow,
  onAfterChangeEditorFontSize,
  onChangeFontSize,
  onChangeNotesPerRow,
}: SettingProps): JSX.Element {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [fontSize, forceUpdate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filedWrapper}>
        <label htmlFor="fontSize">文字サイズ</label>
        <FontSizeRadioButton
          onChange={onChangeFontSize}
          selectedValue={fontSize}
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
