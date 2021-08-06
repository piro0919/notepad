import { Hit } from "@algolia/client-search";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import Seo from "components/templates/Seo";
import useEditorFontSize from "hooks/useEditorFontSize";
import decompress from "libs/decompress";
import getNote from "libs/getNote";
import verifyIdToken from "libs/verifyIdToken";

const NoteTop = dynamic(() => import("components/templates/NoteTop"), {
  ssr: false,
});

export type IdProps = Pick<Hit<Note>, "note" | "objectID" | "title">;

function Id({ note, objectID, title }: IdProps): JSX.Element {
  const { editorFontSize } = useEditorFontSize();

  return (
    <>
      <Seo title={decompress(title)} />
      <NoteTop
        fontSize={editorFontSize}
        id={objectID}
        note={decompress(note)}
      />
    </>
  );
}

export type ServerSideProps = IdProps;

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
    data: { uid },
  } = result;
  const {
    query: { id },
  } = ctx;

  if (typeof id !== "string") {
    return redirect;
  }

  const {
    data: { note, objectID, title, uid: noteUid },
  } = await getNote({ objectID: id });

  if (uid !== noteUid) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { note, objectID, title },
  };
};

export default Id;
