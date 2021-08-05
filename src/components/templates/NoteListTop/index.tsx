import Image from "next/image";
import React from "react";
import Layout from "../Layout";
import styles from "./style.module.scss";
import NoteList, { NoteListProps } from "components/organisms/NoteList";
import useWindowSize from "hooks/useWindowSize";

export type NoteListTopProps = Pick<NoteListProps, "notes" | "notesPerRow">;

function NoteListTop({ notes, notesPerRow }: NoteListTopProps): JSX.Element {
  const { innerHeight } = useWindowSize();

  return (
    <Layout>
      {({ bottomHeight, topHeight }) => {
        if (notes.length) {
          return <NoteList notes={notes} notesPerRow={notesPerRow} />;
        }

        const height = innerHeight - (bottomHeight + topHeight);
        const style = { height: `${height}px` };

        return (
          <div className={styles.wrapper} style={style}>
            <div className={styles.inner}>
              <div className={styles.imageWrapper}>
                <Image alt="girl" layout="fill" src="/images/girl2.png" />
              </div>
              <p className={styles.description}>メモはありません。</p>
            </div>
          </div>
        );
      }}
    </Layout>
  );
}

export default NoteListTop;
