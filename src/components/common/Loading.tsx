import React, { forwardRef } from "react";

const Loading = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="flex justify-center items-center" ref={ref}>
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
      </div>
    </div>
  );
});

Loading.displayName = "Loading";
export default Loading;
