/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@/context/LoadingProvider";
import dynamic from "next/dynamic";
import Loading from "@/components/module/Loading";

const NotFoundPage = dynamic(() => import("@/components/module/NotFoundPage"));
const DynamicComponent = dynamic(() => import("@/components/layout/DynamicComponent"));

const GET_PAGES = gql`
  query GetPages {
    pages(first: 100) {
      nodes {
        flexibleComponent {
          slug
        }
        pageId
      }
    }
  }
`;

export default function Home({ params }) {
  const { load, setLoad } = useLoader();
  const [pages, setPages] = useState(null);

  const { loading, data, error } = useQuery(GET_PAGES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setPages(data);
        setLoad(false);
    },
    onError: () => {
      setLoad(false);
    },
  });

  useEffect(() => {
    setLoad(true);
  }, [setLoad]);

  const currentPage = useMemo(() => {
    return pages?.pages?.nodes.find(
      (item) => item?.flexibleComponent?.slug === params.slug
    );
  }, [pages, params.slug]);

  const pageId = currentPage?.pageId || null;

  if (load || loading) {
    return <Loading />;
  }

  if (pageId === null) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <DynamicComponent id={pageId} />
    </div>
  );
}