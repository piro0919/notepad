import React from "react";
import NotFoundTop from "components/templates/NotFoundTop";
import Seo from "components/templates/Seo";

function Custom404(): JSX.Element {
  return (
    <>
      <Seo title="404" />
      <NotFoundTop />
    </>
  );
}

export default Custom404;
