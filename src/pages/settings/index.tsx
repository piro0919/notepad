import { GetServerSideProps } from "next";
import React, { useContext, useCallback, useState } from "react";
import Loading, { LoadingProps } from "components/templates/Loading";
import QrCode, { QrCodeProps } from "components/templates/QrCode";
import Seo from "components/templates/Seo";
import SettingsTop, {
  SettingsTopProps,
} from "components/templates/SettingsTop";
import FontSizeContext from "contexts/FontSizeContext";
import ThemeContext from "contexts/ThemeContext";
import useEditorFontFamily from "hooks/useEditorFontFamily";
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
  const { editorFontFamily, setEditorFontFamily } = useEditorFontFamily();
  const handleChangeEditorFontFamily = useCallback<
    NonNullable<SettingsTopProps["onChangeEditorFontFamily"]>
  >(
    ({ value }) => {
      setEditorFontFamily(value);
    },
    [setEditorFontFamily]
  );
  const [active, setActive] = useState<LoadingProps["active"]>(false);
  const [active2, setActive2] = useState<QrCodeProps["active"]>(false);
  const handleDisplayQrCode = useCallback<
    NonNullable<SettingsTopProps["onDisplayQrCode"]>
  >(() => {
    setActive2(true);
  }, []);
  const handleClick = useCallback<NonNullable<QrCodeProps["onClick"]>>(() => {
    setActive2(false);
  }, []);

  return (
    <>
      <Seo title="おんめも設定" />
      <SettingsTop
        editorFontFamily={editorFontFamily}
        editorFontSize={parseInt(editorFontSize, 10)}
        fontSize={fontSize}
        notesPerRow={notesPerRow}
        onAfterChangeEditorFontSize={handleAfterChangeEditorFontSize}
        onChangeEditorFontFamily={handleChangeEditorFontFamily}
        onChangeFontSize={setFontSize}
        onChangeNotesPerRow={handleChangeNotesPerRow}
        onChangeTheme={setTheme}
        onDisplayQrCode={handleDisplayQrCode}
        setActive={setActive}
        theme={theme}
      />
      {active ? <Loading active={active} /> : null}
      {active2 ? <QrCode active={active2} onClick={handleClick} /> : null}
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
