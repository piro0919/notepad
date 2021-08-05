import React from "react";
import Layout from "../Layout";
import NoteList, { NoteListProps } from "components/organisms/NoteList";

export type NoteListTopProps = Pick<NoteListProps, "notes" | "notesPerRow">;

function NoteListTop({ notes, notesPerRow }: NoteListTopProps): JSX.Element {
  return (
    <Layout>
      {() => <NoteList notes={notes} notesPerRow={notesPerRow} />}
    </Layout>
  );
}

export default NoteListTop;
