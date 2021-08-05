import { Dispatch, SetStateAction } from "react";
import { useStorageState } from "react-storage-hooks";
import dummyStorage from "libs/dummyStorage";

export type NotesPerRow = {
  notesPerRow: string;
  setNotesPerRow: Dispatch<SetStateAction<string>>;
};

function useNotesPerRow(): NotesPerRow {
  const [notesPerRow, setNotesPerRow] = useStorageState(
    typeof window === "undefined" ? dummyStorage : localStorage,
    "notesPerRow",
    "auto"
  );

  return {
    notesPerRow,
    setNotesPerRow,
  };
}

export default useNotesPerRow;
