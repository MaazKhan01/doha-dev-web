/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState, use } from "react";
import { useLoader } from "@/context/LoadingProvider";
import dynamic from "next/dynamic";
import Loading from "@/components/module/Loading";

const NotFoundPage = dynamic(() => import("@/components/module/NotFoundPage"));
const DynamicComponent = dynamic(() => import("@/components/layout/DynamicComponent"));

const GET_PAGES = gql`
  query GetPages {
    pages(first: 100) {
      nodes {
        flexibleContent {
          component {
            __typename
          }
          slug
        }
        slug
        pageId
      }
    }
  }
`;

export default function Home({ params }) {
  const { lang } = use(params);
  const { load, setLoad } = useLoader();
  const { loading, data } = useQuery(GET_PAGES, {
    fetchPolicy: "cache-and-network",
  });

  const homeSlugs = ["home", "sample-page"];
  const pagesData = data || null;

  const currentPage = useMemo(() => {
    return pagesData?.pages?.nodes.find(
      (item) =>
        homeSlugs.includes(item?.flexibleContent?.slug) ||
        homeSlugs.includes(item?.slug)
    );
  }, [pagesData]);

  const pageId = currentPage?.pageId || null;
  if (load || loading) {
    return <Loading />;
  }

  return (
    <div>
      <DynamicComponent id={pageId || 2} />
    </div>
  );
}
