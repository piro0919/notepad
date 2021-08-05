import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { NoteTopProps } from "components/templates/NoteTop";
import useEditorFontSize from "hooks/useEditorFontSize";
import decompress from "libs/decompress";
import getNote from "libs/getNote";
import verifyIdToken from "libs/verifyIdToken";

const NoteTop = dynamic(() => import("components/templates/NoteTop"), {
  ssr: false,
});

export type IdProps = Pick<NoteTopProps, "id" | "note">;

function Id({ id, note }: IdProps): JSX.Element {
  const { editorFontSize } = useEditorFontSize();

  return <NoteTop fontSize={editorFontSize} id={id} note={note} />;
}

export type ServerSideProps = Pick<IdProps, "id" | "note">;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const redirect = {
    redirect: {
      destination: "/signout",
      permanent: false,
    },
  };

  const result = await verifyIdToken(ctx);

  if ("error" in result) {
    return redirect;
  }

  const {
    query: { id },
  } = ctx;

  if (typeof id !== "string") {
    return redirect;
  }

  const {
    data: { note },
  } = await getNote({ objectID: id });

  return {
    props: { id, note: decompress(note) },
  };
};

export default Id;
