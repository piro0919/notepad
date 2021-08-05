import NoSSR from "@mpth/react-no-ssr";
import React from "react";
import Select, { Props } from "react-select";
import styles from "./style.module.scss";

export type NotesPerRowSelectProps = Pick<Props, "onChange" | "value">;

function NotesPerRowSelect({
  onChange,
  value,
}: NotesPerRowSelectProps): JSX.Element {
  return (
    // SSR だとエラーが発生する
    <NoSSR>
      <Select
        className={styles.select}
        isSearchable={false}
        onChange={onChange}
        options={[
          { label: "auto", value: "auto" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "6", value: "6" },
          { label: "12", value: "12" },
        ]}
        value={value}
      />
    </NoSSR>
  );
}

export default NotesPerRowSelect;
