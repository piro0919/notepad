import { Dispatch, SetStateAction } from "react";
import { useStorageState } from "react-storage-hooks";
import dummyStorage from "libs/dummyStorage";

export type EditorFontSize = {
  editorFontSize: string;
  setEditorFontSize: Dispatch<SetStateAction<string>>;
};

function useEditorFontSize(): EditorFontSize {
  const [editorFontSize, setEditorFontSize] = useStorageState(
    typeof window === "undefined" ? dummyStorage : localStorage,
    "editorFontSize",
    "16"
  );

  return {
    editorFontSize,
    setEditorFontSize,
  };
}

export default useEditorFontSize;
