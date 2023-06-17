import Image from "next/image";
import React from "react";

export default function ArtistCart() {
  return (
    <article className="rounded-xl flex flex-col items-center">
      <Image
        src={
          "https://search.pstatic.net/common?type=b&size=144&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230414120534960.jpg"
        }
        alt={""}
        width={280}
        height={400}
      />
      <p className="text-lg font-bold text-center">볼빨간사춘기</p>
    </article>
  );
}
