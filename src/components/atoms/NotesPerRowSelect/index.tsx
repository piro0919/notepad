import React, { useMemo } from "react";
import Dropdown, { ReactDropdownProps } from "react-dropdown";
import styles from "./style.module.scss";

export type NotesPerRowSelectProps = Pick<
  ReactDropdownProps,
  "onChange" | "value"
>;

function NotesPerRowSelect({
  onChange,
  value,
}: NotesPerRowSelectProps): JSX.Element {
  const options = useMemo(
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
  const label = useMemo(() => {
    const { label } =
      options.find(({ value: optionValue }) => value === optionValue) ||
      options[0];

    return label;
  }, [options, value]);

  return (
    <Dropdown
      arrowClassName={styles.arrow}
      className={styles.dropdown}
      controlClassName={styles.control}
      menuClassName={styles.menu}
      onChange={onChange}
      options={options}
      value={label}
    />
  );
}

export default NotesPerRowSelect;
