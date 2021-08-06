import React from "react";
import NotFoundTop from "components/templates/NotFoundTop";
import Seo from "components/templates/Seo";

function Custom404(): JSX.Element {
  return (
    <>
      <Seo title="404" />
      <NotFoundTop text="お探しのページは見つかりません。" />
    </>
  );
}

export default Custom404;
