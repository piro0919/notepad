import useSize from "@react-hook/size";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  CSSProperties,
} from "react";
import styles from "./style.module.scss";
import Textarea, { TextareaProps } from "components/atoms/Textarea";

export type EditorProps = Pick<TextareaProps, "fontSize"> & {
  bottomHeight?: number;
  textareaRef: TextareaProps["ref"];
};

const Editor = ({
  bottomHeight = 0,
  fontSize,
  textareaRef,
}: EditorProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState(0);
  const [, height2] = useSize(textareaRef, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const handleHeightChange = useCallback<
    NonNullable<TextareaProps["onHeightChange"]>
  >(
    (inputHeight, { rowHeight }) => {
      if (!textareaRef.current) {
        return;
      }

      textareaRef.current.style.minHeight = `calc(100% + ${
        bottomHeight + inputHeight
      }px)`;

      setRowHeight(rowHeight);
    },
    [bottomHeight, textareaRef]
  );
  const [width] = useSize(ref, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const count = useMemo(
    () => Math.floor(height2 / rowHeight || 0),
    [height2, rowHeight]
  );
  const items = useMemo(
    () =>
      [...Array(count)].map((_, index) => (
        <li
          className={styles.item}
          key={index}
          style={{ height: `${rowHeight}px` }}
        >
          {index + 1}
        </li>
      )),
    [count, rowHeight]
  );
  const textareaWrapperStyle = useMemo<CSSProperties>(
    () => ({
      marginLeft: `${width}px`,
    }),
    [width]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper} ref={ref}>
        <ul>{items}</ul>
      </div>
      <div className={styles.textareaWrapper} style={textareaWrapperStyle}>
        <Textarea
          fontSize={fontSize}
          onHeightChange={handleHeightChange}
          ref={textareaRef}
        />
      </div>
    </div>
  );
};

export default Editor;
