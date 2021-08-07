import { Hit } from "@algolia/client-search";
import swalWithReact from "@sweetalert/with-react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import useSWR, { mutate } from "swr";
import Input, { InputProps } from "components/atoms/Input";
import Loading, { LoadingProps } from "components/templates/Loading";
import NoteListTop, {
  NoteListTopProps,
} from "components/templates/NoteListTop";
import PublicTop from "components/templates/PublicTop";
import Seo from "components/templates/Seo";
import useNotesPerRow from "hooks/useNotesPerRow";
import axiosInstance from "libs/axiosInstance";
import compress from "libs/compress";
import decompress from "libs/decompress";
import fetcher from "libs/fetcher";
import searchNotes from "libs/searchNotes";
import verifyIdToken from "libs/verifyIdToken";

export type PagesProps =
  | {
      isSignedIn: true;
      notes: Hit<Note>[];
    }
  | {
      isSignedIn: false;
    };

function Pages(props: PagesProps): JSX.Element {
  const { data } = useSWR<Hit<Note>[]>(
    props.isSignedIn ? "/notes" : null,
    fetcher,
    {
      initialData: props.isSignedIn ? props.notes : undefined,
      revalidateOnFocus: false,
    }
  );
  const { notesPerRow } = useNotesPerRow();
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const ref = useRef<InputProps["ref"]["current"]>(null);
  const notes = useMemo<NoteListTopProps["notes"]>(() => {
    if (!data) {
      return [];
    }

    return data.map(({ createdDate, objectID, title }) => ({
      createdDate: dayjs(createdDate).format("YYYY-MM-DD HH:mm"),
      id: objectID,
      onDelete: async (event) => {
        event.preventDefault();

        const result = await swal({
          buttons: {
            cancel: {
              className: "sweet-button",
              text: "キャンセル",
              visible: true,
            },
            confirm: { className: "sweet-button", text: "削除", visible: true },
          },
          icon: "info",
          text: `メモ”${decompress(title)}”を削除しますか？`,
          title: "削除する",
        });

        if (!result) {
          return;
        }

        setActive(true);

        await axiosInstance.delete("/note", {
          params: {
            objectID,
          },
        });

        setActive(false);

        toast.success("メモを削除しました");

        await mutate("/notes");
      },
      onEdit: async (event) => {
        event.preventDefault();

        const swalPromise = swalWithReact({
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
          text: `タイトルを入力してください`,
          title: "保存する",
        });

        if (!ref.current) {
          return;
        }

        ref.current.value = decompress(title);

        setTimeout(() => {
          if (!ref.current) {
            return;
          }

          ref.current.focus();
        }, 250);

        const result = await swalPromise;

        if (!result || !ref.current.value) {
          return;
        }

        setActive(true);

        await axiosInstance.patch("/note", {
          objectID,
          title: compress(ref.current.value),
        });

        setActive(false);

        toast.success("メモを保存しました");

        await mutate("/notes");
      },
      title: decompress(title),
    }));
  }, [data]);

  return props.isSignedIn ? (
    <>
      <Seo title="メモ一覧" />
      <NoteListTop notes={notes} notesPerRow={parseInt(notesPerRow, 10)} />
      {active ? <Loading active={active} /> : null}
    </>
  ) : (
    <>
      <Seo noIndex={false} type="website" />
      <PublicTop />
    </>
  );
}

export type ServerSideProps = PagesProps;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const result = await verifyIdToken(ctx);

  if ("error" in result) {
    return {
      props: {
        isSignedIn: false,
      },
    };
  }

  const {
    data: { uid },
  } = result;
  const {
    data: { hits },
  } = await searchNotes({
    requestOptions: {
      filters: `uid:${uid}`,
    },
  });

  return {
    props: {
      isSignedIn: true,
      notes: hits,
    },
  };
};

export default Pages;
