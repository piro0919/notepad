import React from "react";
import Layout from "../Layout";
import EditorForm, { EditorFormProps } from "components/organisms/EditorForm";
import useWindowSize from "hooks/useWindowSize";

export type EditorTopProps = Pick<
  EditorFormProps,
  "fontSize" | "initialNote" | "onSubmit"
>;

function EditorTop({
  fontSize,
  initialNote,
  onSubmit,
}: EditorTopProps): JSX.Element {
  const { innerHeight } = useWindowSize();

  return (
    <Layout>
      {({ bottomHeight, topHeight }) => {
        const height = innerHeight - (bottomHeight + topHeight);
        const style = {
          height: `${height}px`,
        };

        return (
          <div style={style}>
            <EditorForm
              bottomHeight={bottomHeight}
              fontSize={fontSize}
              initialNote={initialNote}
              onSubmit={onSubmit}
            />
          </div>
        );
      }}
    </Layout>
  );
}

export default EditorTop;
