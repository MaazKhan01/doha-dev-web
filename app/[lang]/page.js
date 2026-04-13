/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useLoader } from "@/context/LoadingProvider";
import Loading from "@/components/module/Loading";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  const { load, setLoad } = useLoader();

  useEffect(() => {
    setLoad(false);
  }, []);

  return (
    <>
      {load && <Loading />}
      <HomePage />
    </>
  );
}
