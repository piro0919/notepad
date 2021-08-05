import useSize from "@react-hook/size";
import { useRouter } from "next/router";
import React, {
  CSSProperties,
  Fragment,
  useCallback,
  useMemo,
  useRef,
} from "react";
import reactStringReplace from "react-string-replace";
import Layout from "../Layout";
import styles from "./style.module.scss";
import Button, { ButtonProps } from "components/atoms/Button";
import useWindowSize from "hooks/useWindowSize";

export type NoteTopProps = {
  fontSize?: string;
  id: string;
  note: string;
};

function NoteTop({ fontSize, id, note }: NoteTopProps): JSX.Element {
  const { innerHeight } = useWindowSize();
  const router = useRouter();
  const handleEdit = useCallback<NonNullable<ButtonProps["onClick"]>>(() => {
    router.push(`/notes/${id}/edit`);
  }, [id, router]);
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize(ref, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const noteStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      marginLeft: `${width}px`,
      wordBreak: "break-all",
    }),
    [fontSize, width]
  );
  const target = useRef<HTMLDivElement>(null);
  const [, height] = useSize(target, {
    initialHeight: 0,
    initialWidth: 0,
  });
  const itemHeight = useMemo(
    () => parseInt(fontSize || "1", 10) * 1.5,
    [fontSize]
  );
  const count = useMemo(
    () => Math.ceil(height / itemHeight || 0),
    [height, itemHeight]
  );
  const items = useMemo(
    () =>
      [...Array(count)].map((_, index) => (
        <li
          className={styles.item}
          key={index}
          style={{ height: `${itemHeight}px` }}
        >
          {index + 1}
        </li>
      )),
    [count, itemHeight]
  );

  return (
    <Layout>
      {({ bottomHeight, topHeight }) => {
        const height = innerHeight - (bottomHeight + topHeight);
        const style = {
          minHeight: `${height}px`,
        };
        const buttonsWrapperstyle = {
          bottom: `${bottomHeight}px`,
        };

        return (
          <div className={styles.wrapper} style={style}>
            <div className={styles.listWrapper} ref={ref}>
              <ul>{items}</ul>
            </div>
            <div ref={target} style={noteStyle}>
              {note.split("\n").map((n, index) => (
                <Fragment key={index}>
                  {index > 0 ? <br /> : null}
                  {reactStringReplace(
                    n,
                    /(https?:\/\/\S+)/g,
                    (match, index) => (
                      <a
                        className={styles.a}
                        href={match}
                        key={match + index}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {match}
                      </a>
                    )
                  )}
                </Fragment>
              ))}
            </div>
            <div className={styles.buttonsWrapper} style={buttonsWrapperstyle}>
              <Button onClick={handleEdit}>編集する</Button>
            </div>
          </div>
        );
      }}
    </Layout>
  );
}

export default NoteTop;
