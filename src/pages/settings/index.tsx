import { GetServerSideProps } from "next";
import React, { useContext, useCallback, useMemo } from "react";
import SettingsTop, {
  SettingsTopProps,
} from "components/templates/SettingsTop";
import FontSizeContext from "contexts/FontSizeContext";
import useEditorFontSize from "hooks/useEditorFontSize";
import useNotesPerRow from "hooks/useNotesPerRow";
import verifyIdToken from "libs/verifyIdToken";

function Settings(): JSX.Element {
  const { editorFontSize, setEditorFontSize } = useEditorFontSize();
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { notesPerRow, setNotesPerRow } = useNotesPerRow();
  const notesPerRowProp = useMemo<SettingsTopProps["notesPerRow"]>(
    () => ({ label: notesPerRow, value: notesPerRow }),
    [notesPerRow]
  );
  const handleAfterChangeEditorFontSize = useCallback<
    NonNullable<SettingsTopProps["onAfterChangeEditorFontSize"]>
  >(
    (value) => {
      setEditorFontSize(value.toString());
    },
    [setEditorFontSize]
  );
  const handleChangeNotesPerRow = useCallback<
    NonNullable<SettingsTopProps["onChangeNotesPerRow"]>
  >(
    (v) => {
      if (!v) {
        return;
      }

      const { value } = v;

      setNotesPerRow(value);
    },
    [setNotesPerRow]
  );

  return (
    <SettingsTop
      editorFontSize={parseInt(editorFontSize, 10)}
      fontSize={fontSize}
      notesPerRow={notesPerRowProp}
      onAfterChangeEditorFontSize={handleAfterChangeEditorFontSize}
      onChangeFontSize={setFontSize}
      onChangeNotesPerRow={handleChangeNotesPerRow}
    />
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

export default Settings;
