/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useLoader } from "@/context/LoadingProvider";
import Loading from "@/components/module/Loading";

export default function Home() {
  const { load, setLoad } = useLoader();

  useEffect(() => {
    setLoad(false);
  }, []);

  return (
    <>
      {load && <Loading />}
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">QOC UCMS</h1>
      </div>
    </>
  );
}
