import { NextSeo } from "next-seo";
import React from "react";

export type SeoProps = {
  noIndex?: boolean;
  title?: string;
};

function Seo({ noIndex = true, title }: SeoProps): JSX.Element {
  return (
    <NextSeo
      description="おんめもは、さまざまな端末でメモを共有できるサービスです。"
      noindex={noIndex}
      title={`${title ? `${title} | ` : ""}おんめも`}
    />
  );
}

export default Seo;
