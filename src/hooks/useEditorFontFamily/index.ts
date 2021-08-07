import { Dispatch, SetStateAction } from "react";
import { useStorageState } from "react-storage-hooks";
import dummyStorage from "libs/dummyStorage";

export type EditorFontFamily = {
  editorFontFamily: string;
  setEditorFontFamily: Dispatch<SetStateAction<string>>;
};

function useEditorFontFamily(): EditorFontFamily {
  const [editorFontFamily, setEditorFontFamily] = useStorageState(
    typeof window === "undefined" ? dummyStorage : localStorage,
    "editorFontFamily",
    "arial, sans-serif"
  );

  return {
    editorFontFamily,
    setEditorFontFamily,
  };
}

export default useEditorFontFamily;
