"use client";

import LogoLoader from "@/components/ui/LogoLoader";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <LogoLoader />
    </div>
  );
};

export default Loading;