import swal from "@sweetalert/with-react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import Input, { InputProps } from "components/atoms/Input";
import EditorTop, { EditorTopProps } from "components/templates/EditorTop";
import Loading, { LoadingProps } from "components/templates/Loading";
import Seo from "components/templates/Seo";
import useEditorFontFamily from "hooks/useEditorFontFamily";
import useEditorFontSize from "hooks/useEditorFontSize";
import axiosInstance from "libs/axiosInstance";
import compress from "libs/compress";
import verifyIdToken from "libs/verifyIdToken";

function New(): JSX.Element {
  const { editorFontSize } = useEditorFontSize();
  const router = useRouter();
  const ref = useRef<InputProps["ref"]["current"]>(null);
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const handleSubmit = useCallback<EditorTopProps["onSubmit"]>(
    async ({ value }) => {
      if (!value) {
        return;
      }

      const swalPromise = swal({
        buttons: {
          cancel: {
            className: "sweet-button",
            text: "キャンセル",
            visible: true,
          },
          confirm: { className: "sweet-button", text: "保存", visible: true },
        },
        content: <Input ref={ref} />,
        icon: "info",
        text: "タイトルを入力してください",
        title: "保存する",
      });

      setTimeout(() => {
        if (!ref.current) {
          return;
        }

        ref.current.focus();
      }, 250);

      const result = await swalPromise;

      if (!result || !ref.current || !ref.current.value) {
        return;
      }

      setActive(true);

      const {
        data: { objectID },
      } = await axiosInstance.post<{ objectID: string; taskID: number }>(
        "/note",
        {
          createdDate: dayjs().format(),
          modifiedDate: dayjs().format(),
          note: compress(value),
          title: compress(ref.current.value),
        }
      );

      toast.success("メモを保存しました");

      await router.push(`/notes/${objectID}`);
    },
    [router]
  );
  const { editorFontFamily } = useEditorFontFamily();

  return (
    <>
      <Seo title="新規メモ" />
      <EditorTop
        fontFamily={editorFontFamily}
        fontSize={editorFontSize}
        onSubmit={handleSubmit}
      />
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

  return {
    props: {},
  };
};

export default New;
