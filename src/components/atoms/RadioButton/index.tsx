import React, { useMemo } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import styles from "./style.module.scss";

type Value = Pick<Radio.RadioProps, "value"> & {
  label: Radio.RadioProps["id"];
};

export type RadioButtonProps = Pick<
  RadioGroup.RadioGroupProps,
  "name" | "onChange" | "selectedValue"
> & {
  values: Value[];
};

function RadioButton({
  name,
  onChange,
  values,
  selectedValue,
}: RadioButtonProps): JSX.Element {
  const labels = useMemo(
    () =>
      values.map(({ label, value }) => (
        <label className={styles.label} htmlFor={label} key={label}>
          <Radio className={styles.radio} id={label} value={value} />
          {label}
        </label>
      )),
    [values]
  );

  return (
    <RadioGroup
      className={styles.radioGroup}
      name={name}
      onChange={onChange}
      selectedValue={selectedValue}
    >
      {labels}
    </RadioGroup>
  );
}

export default RadioButton;
