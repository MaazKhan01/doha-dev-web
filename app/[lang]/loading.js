"use client";

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-white z-[9999]">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
    </div>
  );
};

export default Loading;