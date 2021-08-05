import React, { forwardRef, RefObject } from "react";
import styles from "./style.module.scss";

export type InputProps = {
  ref: RefObject<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, Omit<InputProps, "ref">>(
  (_: Omit<InputProps, "ref">, ref): JSX.Element => {
    return <input className={styles.input} ref={ref} />;
  }
);

Input.displayName = "Input";

export default Input;
