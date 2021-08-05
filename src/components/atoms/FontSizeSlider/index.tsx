import React from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import styles from "./style.module.scss";

export type FontSizeSliderProps = Pick<
  ReactSliderProps,
  "onAfterChange" | "value"
>;

function FontSizeSlider({
  onAfterChange,
  value,
}: FontSizeSliderProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <ReactSlider
        className={styles.slider}
        max={32}
        min={10}
        onAfterChange={onAfterChange}
        renderThumb={(props, { valueNow }) => (
          <div {...props}>{`${valueNow}px`}</div>
        )}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        value={value}
      />
    </div>
  );
}

export default FontSizeSlider;
