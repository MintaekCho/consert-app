import React, { MouseEvent, useState } from "react";

type Props = {
  navState: string;
  category: string[];
  handleClick: (e: MouseEvent<HTMLLIElement>) => void;
};

export default function Navbar({ navState, category, handleClick }: Props) {
  return (
    <div className="mt-8 p-8">
      <ul className="flex gap-6 text-lg font-bold">
        {category.map((item, i) => (
          <li
            key={i}
            className={`cursor-pointer text-xs md:text-sm xl:text-lg py-2 mx-2 text-white ${
              navState === item ? "border-b-2" : "opacity-70"
            }`}
            onClick={handleClick}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
