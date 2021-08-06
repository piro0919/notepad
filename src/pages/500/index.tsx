import React from "react";
import NotFoundTop from "components/templates/NotFoundTop";
import Seo from "components/templates/Seo";

function Custom500(): JSX.Element {
  return (
    <>
      <Seo title="500" />
      <NotFoundTop text="アクセスしようとしたページは表示できませんでした。" />
    </>
  );
}

export default Custom500;
