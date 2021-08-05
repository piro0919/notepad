import Head from "next/head";
import React from "react";

export type SeoProps = {
  noIndex?: boolean;
  ogType?: "article" | "website";
  title?: string;
};

function Seo({
  noIndex = true,
  ogType = "article",
  title,
}: SeoProps): JSX.Element {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <meta
        content={noIndex ? "noindex, nofollow" : "index, follow"}
        name="robots"
      />
      <title>{`${title ? `${title} | ` : ""}おんめも`}</title>
      <meta
        content="おんめもは、さまざまな端末でメモを共有できるサービスです。"
        name="description"
      />
      <meta content="telephone=no" name="format-detection" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content={ogType} property="og:type" />
      <meta
        content={`${title ? `${title} | ` : ""}おんめも`}
        property="og:title"
      />
      <meta
        content="おんめもは、さまざまな端末でメモを共有できるサービスです。"
        property="og:description"
      />
      <meta content="https://on-memo.kk-web.link" property="og:url" />
      <meta
        content="https://on-memo.kk-web.link/images/girl1.png"
        property="og:image"
      />
      <meta content="おんめも" property="og:site_name" />
      <meta content="ja_JP" property="og:locale" />
      <meta content="183839507072963" property="fb:app_id" />
      <meta content="summary" name="twitter:card" />
      <link href="https://on-memo.kk-web.link" rel="canonical" />
    </Head>
  );
}

export default Seo;
