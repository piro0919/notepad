import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";

export type SeoProps = {
  noIndex?: boolean;
  title?: string;
  type?: "article" | "website";
};

function Seo({
  noIndex = true,
  title,
  type = "article",
}: SeoProps): JSX.Element {
  return (
    <>
      <Head>
        <link href="/manifest.json" rel="manifest" />
        <meta content="kk-web" name="author" />
      </Head>
      <NextSeo
        description="おんめもは、さまざまな端末でメモを共有できるサービスです。"
        noindex={noIndex}
        openGraph={{
          title,
          type,
          description:
            "おんめもは、さまざまな端末でメモを共有できるサービスです。",
          images: [
            {
              alt: "girl1",
              height: 800,
              url: "https://on-memo.kk-web.link/images/girl1.png",
              width: 800,
            },
            {
              alt: "girl2",
              height: 800,
              url: "https://on-memo.kk-web.link/images/girl2.png",
              width: 800,
            },
            {
              alt: "cat1",
              height: 800,
              url: "https://on-memo.kk-web.link/images/cat1.png",
              width: 800,
            },
          ],
          site_name: "おんめも",
          url: "https://on-memo.kk-web.link",
        }}
        title={`${title ? `${title} | ` : ""}おんめも`}
        twitter={{
          cardType: "summary",
        }}
      />
    </>
  );
}

export default Seo;
