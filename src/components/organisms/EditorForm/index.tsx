import React, {
  CSSProperties,
  MouseEventHandler,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import styles from "./style.module.scss";
import Button from "components/atoms/Button";
import Editor, { EditorProps } from "components/molecules/Editor";

export type EditorFormProps = Pick<
  EditorProps,
  "bottomHeight" | "fontFamily" | "fontSize"
> & {
  bottomHeight?: number;
  initialNote?: string;
  onSubmit: ({ value }: { value: string }) => void;
};

function EditorForm({
  bottomHeight = 0,
  fontFamily,
  fontSize,
  initialNote = "",
  onSubmit,
}: EditorFormProps): JSX.Element {
  const ref = useRef<EditorProps["textareaRef"]["current"]>(null);
  const buttonWrapperstyle = useMemo<CSSProperties>(
    () => ({
      bottom: `${bottomHeight}px`,
    }),
    [bottomHeight]
  );
  const handleSubmit = useCallback<MouseEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (!ref.current) {
        onSubmit({ value: "" });

        return;
      }

      onSubmit({ value: ref.current.value });
    },
    [onSubmit]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.value = initialNote;
  }, [initialNote]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Editor
        bottomHeight={bottomHeight}
        fontFamily={fontFamily}
        fontSize={fontSize}
        textareaRef={ref}
      />
      <div className={styles.buttonWrapper} style={buttonWrapperstyle}>
        <Button type="submit">保存する</Button>
      </div>
    </form>
  );
}

export default EditorForm;
