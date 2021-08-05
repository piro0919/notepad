import swalWithReact from "@sweetalert/with-react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useRef, useState } from "react";
import swal from "sweetalert";
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
import searchNotes from "libs/searchNotes";
import verifyIdToken from "libs/verifyIdToken";

export type PagesProps =
  | (Pick<NoteListTopProps, "notes"> & {
      isSignedIn: true;
    })
  | {
      isSignedIn: false;
    };

function Pages(props: PagesProps): JSX.Element {
  const { notesPerRow } = useNotesPerRow();
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const router = useRouter();
  const ref = useRef<InputProps["ref"]["current"]>(null);
  const notes = useMemo<NoteListTopProps["notes"]>(() => {
    if (!props.isSignedIn) {
      return [];
    }

    const { notes } = props;

    return notes.map(({ createdDate, id, title }) => ({
      createdDate,
      id,
      title,
      onDelete: async (event) => {
        event.preventDefault();

        const result = await swal({
          buttons: ["キャンセル", "削除"],
          icon: "info",
          text: `メモ”${title}”を削除しますか？`,
          title: "削除する",
        });

        if (!result) {
          return;
        }

        setActive(true);

        await axiosInstance.delete("/note", {
          params: {
            objectID: id,
          },
        });

        router.reload();
      },
      onEdit: async (event) => {
        event.preventDefault();

        const swal = swalWithReact({
          buttons: ["キャンセル", "保存"],
          content: <Input ref={ref} />,
          icon: "info",
          text: `タイトルを入力してください`,
          title: "保存する",
        });

        if (!ref.current) {
          return;
        }

        ref.current["value"] = title;

        const result = await swal;

        if (!result || !ref.current.value) {
          return;
        }

        setActive(true);

        await axiosInstance.patch("/note", {
          objectID: id,
          title: compress(ref.current.value),
        });

        router.reload();
      },
    }));
  }, [props, router]);

  return props.isSignedIn ? (
    <>
      <Seo title="メモ一覧" />
      <NoteListTop notes={notes} notesPerRow={parseInt(notesPerRow, 10)} />
      {active ? <Loading active={active} /> : null}
    </>
  ) : (
    <>
      <Seo noIndex={false} />
      <PublicTop />
    </>
  );
}

export type ServerSideProps =
  | {
      isSignedIn: true;
      notes: Omit<NoteListTopProps["notes"][0], "onDelete" | "onEdit">[];
    }
  | {
      isSignedIn: false;
    };

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
      notes: hits.map(({ createdDate, objectID, title }) => ({
        createdDate: dayjs(createdDate).format("YYYY-MM-DD HH:mm"),
        id: objectID,
        title: decompress(title),
      })),
    },
  };
};

export default Pages;
