import NoSSR from "@mpth/react-no-ssr";
import Link from "next/link";
import React, { useMemo } from "react";
import { Container, Row, Col, useScreenClass } from "react-grid-system";
import styles from "./style.module.scss";
import NoteBlock, { NoteBlockProps } from "components/molecules/NoteBlock";

type Note = Pick<
  NoteBlockProps,
  "createdDate" | "onDelete" | "onEdit" | "title"
> & {
  id: string;
};

export type NoteListProps = {
  notes: Note[];
  notesPerRow: number;
};

function NoteList({
  notes,
  notesPerRow: notesPerRowProp,
}: NoteListProps): JSX.Element {
  const screenClass = useScreenClass();
  const notesPerRow = useMemo(() => {
    if (!isNaN(notesPerRowProp)) {
      return notesPerRowProp;
    }

    if (["xs", "sm"].includes(screenClass)) {
      return 1;
    }

    if (["md"].includes(screenClass)) {
      return 2;
    }

    if (["lg"].includes(screenClass)) {
      return 3;
    }

    return 4;
  }, [notesPerRowProp, screenClass]);
  const rows = useMemo(
    () =>
      notes
        .reduce<typeof notes[]>(
          (previousValue, _, index) =>
            index % notesPerRow
              ? previousValue
              : [...previousValue, notes.slice(index, index + notesPerRow)],
          []
        )
        .map((comics, index) => {
          const cols = comics.map(
            ({ createdDate, id, onDelete, onEdit, title }, index2) => (
              <Col
                className={styles.col}
                debug={process.env.NODE_ENV === "development" && false}
                key={index2}
                xs={12 / notesPerRow}
              >
                <Link href={`/notes/${id}`}>
                  <a>
                    <NoteBlock
                      createdDate={createdDate}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      title={title}
                    />
                  </a>
                </Link>
              </Col>
            )
          );

          return (
            <Row
              className={styles.row}
              gutterWidth={1}
              key={index}
              nogutter={true}
            >
              {cols}
            </Row>
          );
        }),
    [notes, notesPerRow]
  );

  return (
    // SSR だとエラーが発生する
    <NoSSR>
      <Container fluid={true}>{rows}</Container>
    </NoSSR>
  );
}

export default NoteList;
