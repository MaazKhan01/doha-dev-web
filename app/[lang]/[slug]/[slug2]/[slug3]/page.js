/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DynamicComponent from "@/components/layout/DynamicComponent";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import NotFoundPage from "@/components/module/NotFoundPage.js";
import Loading from "@/components/module/Loading";
import { useLoader } from "@/context/LoadingProvider";

export default function Home({ params }) {
  const [pageId, setPageId] = useState();
  const { load, setLoad } = useLoader();
  const { loading, data } = useQuery(
    gql`
      query MyQuery {
        pages(first: 100) {
          nodes {
            flexibleContent {
              slug
            }
            pageId
          }
        }
      }
    `
  );

  useEffect(() => {
    setLoad(true);
    if (!loading) {
      let temp = data?.pages?.nodes?.find(
        (item) =>
          item?.flexibleContent?.slug ===
          `${params?.slug}/${params?.slug2}/${params?.slug3}`
      );
      if (temp === undefined) {
        setPageId(null);
      } else {
        setPageId(temp?.pageId);
      }
    }
  }, [loading, data, params]);

  return (
    <>
      {load && <Loading />}
      <div>
        {pageId === null ? <NotFoundPage /> : <DynamicComponent id={pageId} />}
      </div>
    </>
  );
}
