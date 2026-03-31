"use client";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { PAGES_QUERY } from "@/utils/graphQueries";
import { useLanguage } from "@/context/LanguageProvider";

const DynamicComponent = ({ id }) => {
  const { lng } = useLanguage();
  const [dataset, setDataset] = useState([]);

  const { loading, data } = useQuery(
    gql`
      ${PAGES_QUERY}
    `,
    {
      variables: { id: Number(id) },
    }
  );

  useEffect(() => {
    if (!loading) {
      setDataset(data?.pages?.nodes[0]?.flexibleComponent?.component || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, id]);

  const renderComponent = (typename, idx) => {
    // Register your new components here as you build them
    switch (typename) {
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        {dataset?.length > 0 &&
          dataset?.map((item, idx) => (
            <React.Fragment key={idx}>
              {renderComponent(item?.__typename, idx)}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default DynamicComponent;
