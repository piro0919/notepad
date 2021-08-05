import { Hit } from "@algolia/client-search";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import EditorTop, { EditorTopProps } from "components/templates/EditorTop";
import Loading, { LoadingProps } from "components/templates/Loading";
import Seo from "components/templates/Seo";
import useEditorFontSize from "hooks/useEditorFontSize";
import axiosInstance from "libs/axiosInstance";
import compress from "libs/compress";
import decompress from "libs/decompress";
import getNote from "libs/getNote";
import verifyIdToken from "libs/verifyIdToken";

export type EditProps = Pick<Hit<Note>, "note" | "objectID" | "title">;

function Edit({ note, objectID, title }: EditProps): JSX.Element {
  const { editorFontSize } = useEditorFontSize();
  const router = useRouter();
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const handleSubmit = useCallback<EditorTopProps["onSubmit"]>(
    async ({ value }) => {
      const result = await swal({
        buttons: {
          cancel: {
            className: "sweet-button",
            text: "キャンセル",
            visible: true,
          },
          confirm: { className: "sweet-button", text: "保存", visible: true },
        },
        icon: "info",
        text: "メモを保存しますか？",
        title: "保存する",
      });

      if (!result) {
        return;
      }

      setActive(true);

      await axiosInstance.patch("/note", {
        objectID,
        modifiedDate: dayjs().format(),
        note: compress(value),
      });

      toast.success("メモを保存しました");

      await router.push(`/notes/${objectID}`);
    },
    [objectID, router]
  );

  return (
    <>
      <Seo title={decompress(title)} />
      <EditorTop
        fontSize={editorFontSize}
        initialNote={decompress(note)}
        onSubmit={handleSubmit}
      />
      {active ? <Loading active={active} /> : null}
    </>
  );
}

export type ServerSideProps = EditProps;

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
    data: { note, objectID, title },
  } = await getNote({ objectID: id });

  return {
    props: { note, objectID, title },
  };
};

export default Edit;
