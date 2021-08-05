import React, { useEffect, useState, forwardRef, RefObject } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import styles from "./style.module.scss";

export type TextareaProps = Pick<TextareaAutosizeProps, "onHeightChange"> & {
  fontSize?: string;
  ref: RefObject<HTMLTextAreaElement>;
};

const Textarea = forwardRef<HTMLTextAreaElement, Omit<TextareaProps, "ref">>(
  (
    { fontSize, onHeightChange }: Omit<TextareaProps, "ref">,
    ref
  ): JSX.Element => {
    const [style, setStyle] = useState<TextareaAutosizeProps["style"]>();

    useEffect(() => {
      // useMemo で設定すると初期化されない
      setStyle({ fontSize: `${fontSize}px` });
    }, [fontSize]);

    return (
      <TextareaAutosize
        className={styles.textarea}
        onHeightChange={onHeightChange}
        ref={ref}
        style={style}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
