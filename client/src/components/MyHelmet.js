import React from "react";
import { Helmet } from "react-helmet";

const MyHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content="전국에서 우리학교 게임 순위 궁금해 ?! 우리학교 순위랑 내 순위를 스쿨랭커에서 확인 해 봐 !"
      />
      <meta
        name="keywords"
        content="스쿨랭커, schoolranker, school ranker, 학교순위 스쿨랭킹 우리학교"
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="전국에서 우리학교 게임 순위 궁금해 ?! 우리학교 순위랑 내 순위를 스쿨랭커에서 확인 해 봐 !"
      />
      <meta
        property="og:image"
        content={`${process.env.PUBLIC_URL}/img/logo.png`}
      />
      <meta property="og:site_name" content="School Ranker" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https:/schoolranker.co.kr" />

      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

export default MyHelmet;
