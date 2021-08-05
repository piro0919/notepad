import React from "react";
import { RadioGroup, Radio } from "react-radio-group";
import styles from "./style.module.scss";

export type FontSizeRadioButtonProps = Pick<
  RadioGroup.RadioGroupProps,
  "onChange" | "selectedValue"
>;

function FontSizeRadioButton({
  onChange,
  selectedValue,
}: FontSizeRadioButtonProps): JSX.Element {
  return (
    <RadioGroup
      className={styles.radioGroup}
      name="fruit"
      onChange={onChange}
      selectedValue={selectedValue}
    >
      <label className={styles.label} htmlFor="small">
        <Radio className={styles.radio} value="small" />小
      </label>
      <label className={styles.label} htmlFor="medium">
        <Radio className={styles.radio} value="medium" />中
      </label>
      <label className={styles.label} htmlFor="large">
        <Radio className={styles.radio} value="large" />大
      </label>
    </RadioGroup>
  );
}

export default FontSizeRadioButton;
