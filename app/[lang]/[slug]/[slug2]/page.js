/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DynamicComponent from "@/components/layout/DynamicComponent";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import NotFoundPage from "@/components/module/NotFoundPage.js";
import { useLoader } from "@/context/LoadingProvider";
import Loading from "@/components/module/Loading";

export default function Home({ params }) {
  const [pageId, setPageId] = useState();
  const { load, setLoad } = useLoader();
  const { loading, data } = useQuery(
    gql`
      query MyQuery {
        pages(first: 100) {
          nodes {
            flexibleComponent {
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
          item?.flexibleComponent?.slug === `${params?.slug}/${params?.slug2}`
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
      {pageId === null ? (
        <NotFoundPage />
      ) : (
        <div>{pageId !== null && <DynamicComponent id={pageId} />}</div>
      )}
    </>
  );
}
