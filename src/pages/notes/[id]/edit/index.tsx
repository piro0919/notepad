import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import swal from "sweetalert";
import EditorTop, { EditorTopProps } from "components/templates/EditorTop";
import Loading, { LoadingProps } from "components/templates/Loading";
import Seo, { SeoProps } from "components/templates/Seo";
import useEditorFontSize from "hooks/useEditorFontSize";
import axiosInstance from "libs/axiosInstance";
import compress from "libs/compress";
import decompress from "libs/decompress";
import getNote from "libs/getNote";
import verifyIdToken from "libs/verifyIdToken";

export type EditProps = Pick<EditorTopProps, "initialNote"> &
  Pick<SeoProps, "title"> & {
    id: string;
  };

function Edit({ id, initialNote, title }: EditProps): JSX.Element {
  const { editorFontSize } = useEditorFontSize();
  const router = useRouter();
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const handleSubmit = useCallback<EditorTopProps["onSubmit"]>(
    async ({ value }) => {
      const result = await swal({
        buttons: ["キャンセル", "保存"],
        icon: "info",
        text: "メモを保存しますか？",
        title: "保存する",
      });

      if (!result) {
        return;
      }

      setActive(true);

      await axiosInstance.patch("/note", {
        modifiedDate: dayjs().format(),
        note: compress(value),
        objectID: id,
      });

      await router.push(`/notes/${id}`);
    },
    [id, router]
  );

  return (
    <>
      <Seo title={title} />
      <EditorTop
        fontSize={editorFontSize}
        initialNote={initialNote}
        onSubmit={handleSubmit}
      />
      {active ? <Loading active={active} /> : null}
    </>
  );
}

export type ServerSideProps = Pick<EditProps, "id" | "initialNote">;

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
    data: { note, title },
  } = await getNote({ objectID: id });

  return {
    props: {
      id,
      initialNote: decompress(note),
      title: decompress(title),
    },
  };
};

export default Edit;
