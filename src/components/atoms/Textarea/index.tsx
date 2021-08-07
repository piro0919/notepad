import React, { useEffect, useState, forwardRef, RefObject } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import styles from "./style.module.scss";

export type TextareaProps = Pick<TextareaAutosizeProps, "onHeightChange"> & {
  fontFamily?: string;
  fontSize?: string;
  ref: RefObject<HTMLTextAreaElement>;
};

const Textarea = forwardRef<HTMLTextAreaElement, Omit<TextareaProps, "ref">>(
  (
    { fontFamily, fontSize, onHeightChange }: Omit<TextareaProps, "ref">,
    ref
  ): JSX.Element => {
    const [style, setStyle] = useState<TextareaAutosizeProps["style"]>();

    useEffect(() => {
      // useMemo で設定すると font-size が初期化されない
      setStyle({ fontFamily, fontSize: `${fontSize}px` });
    }, [fontFamily, fontSize]);

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
