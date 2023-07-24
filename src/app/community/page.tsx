import WriteBtn from "@/components/atoms/WriteBtn";
import WriteList from "@/components/organisms/WriteList";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <WriteList />
      <div className="mr-2 flex justify-end">
        <WriteBtn text="글쓰기" routeUrl="/community/write" />
      </div>
    </div>
  );
}
