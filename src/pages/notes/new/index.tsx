import swal from "@sweetalert/with-react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import Input, { InputProps } from "components/atoms/Input";
import EditorTop, { EditorTopProps } from "components/templates/EditorTop";
import Loading, { LoadingProps } from "components/templates/Loading";
import Seo from "components/templates/Seo";
import useEditorFontSize from "hooks/useEditorFontSize";
import axiosInstance from "libs/axiosInstance";
import compress from "libs/compress";
import verifyIdToken from "libs/verifyIdToken";

export type NewProps = {
  uid: string;
};

function New({ uid }: NewProps): JSX.Element {
  const { editorFontSize } = useEditorFontSize();
  const router = useRouter();
  const ref = useRef<InputProps["ref"]["current"]>(null);
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const handleSubmit = useCallback<EditorTopProps["onSubmit"]>(
    async ({ value }) => {
      if (!value) {
        return;
      }

      const result = await swal({
        buttons: ["キャンセル", "保存"],
        content: <Input ref={ref} />,
        icon: "info",
        text: "タイトルを入力してください",
        title: "保存する",
      });

      if (!result || !ref.current || !ref.current.value) {
        return;
      }

      setActive(true);

      const {
        data: { objectID },
      } = await axiosInstance.post<{ objectID: string; taskID: number }>(
        "/note",
        {
          uid,
          createdDate: dayjs().format(),
          modifiedDate: dayjs().format(),
          note: compress(value),
          title: compress(ref.current.value),
        }
      );

      await router.push(`/notes/${objectID}`);
    },
    [router, uid]
  );

  return (
    <>
      <Seo title="新規メモ" />
      <EditorTop fontSize={editorFontSize} onSubmit={handleSubmit} />
      {active ? <Loading active={active} /> : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return {
    props: { uid },
  };
};

export default New;
