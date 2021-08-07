import React, { ReactNode, useMemo } from "react";
import Dropdown, { ReactDropdownProps } from "react-dropdown";
import styles from "./style.module.scss";

type Option = {
  label: string;
  labelNode?: ReactNode;
  value: string;
};

export type SelectProps = Pick<ReactDropdownProps, "onChange"> & {
  options: Option[];
  value: string;
};

function Select({ onChange, options, value }: SelectProps): JSX.Element {
  const dropdownOptions = useMemo(
    () =>
      options.map(({ label, labelNode, value }) => ({
        value,
        label: labelNode || label,
      })),
    [options]
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
      options={dropdownOptions}
      value={label}
    />
  );
}

export default Select;
