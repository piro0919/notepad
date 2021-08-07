import { GetServerSideProps } from "next";
import React, { useContext, useCallback, useMemo } from "react";
import Seo from "components/templates/Seo";
import SettingsTop, {
  SettingsTopProps,
} from "components/templates/SettingsTop";
import FontSizeContext from "contexts/FontSizeContext";
import ThemeContext from "contexts/ThemeContext";
import useEditorFontSize from "hooks/useEditorFontSize";
import useNotesPerRow from "hooks/useNotesPerRow";
import verifyIdToken from "libs/verifyIdToken";

function Settings(): JSX.Element {
  const { editorFontSize, setEditorFontSize } = useEditorFontSize();
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { notesPerRow, setNotesPerRow } = useNotesPerRow();
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
    ({ value }) => {
      setNotesPerRow(value);
    },
    [setNotesPerRow]
  );
  const { setTheme, theme } = useContext(ThemeContext);

  return (
    <>
      <Seo title="おんめも設定" />
      <SettingsTop
        editorFontSize={parseInt(editorFontSize, 10)}
        fontSize={fontSize}
        notesPerRow={notesPerRow}
        onAfterChangeEditorFontSize={handleAfterChangeEditorFontSize}
        onChangeFontSize={setFontSize}
        onChangeNotesPerRow={handleChangeNotesPerRow}
        onChangeTheme={setTheme}
        theme={theme}
      />
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

export default Settings;
