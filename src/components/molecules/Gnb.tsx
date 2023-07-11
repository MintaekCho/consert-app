"use client";
import { useState } from "react";
import LinkItem from "../atoms/LinkItem";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageList } from "@/router/pages";

const Gnb = () => {
  const [visible, setVisible] = useState(false);
  const path = usePathname();

  return (
    <>
      <div className={`relative rounded-md sm:hidden`}>
        <Hamburger
          size={20}
          onToggle={(toggled) => {
            if (toggled) setVisible(true);
            else setVisible(false);
          }}
        />
        {visible && (
          <div className="relative">
            <div className="absolute top-2 left-4 border-solid border-b-white border-b-8 border-x-transparent border-x-8 border-t-0"></div>
            <ul className="absolute top-4 left-0 flex flex-col gap-3 text-lg rounded-md bg-white px-4 py-6">
              {pageList.map(({ id, href, label }, index) => {
                return (
                  <li
                    key={id}
                    className={`w-full text-black ${
                      href === path ? "text-purple-600" : ""
                    } hover:text-purple-600`}
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <ul className="hidden sm:flex items-center">
        {pageList.map(({ id, href, label }, index) => {
          return (
            <LinkItem href={href} key={id}>
              {label}
            </LinkItem>
          );
        })}
      </ul>
    </>
  );
};

export default Gnb;
