"use client";
import { pageList } from "@/router/pages";
import { useState } from "react";
import LinkItem from "../atoms/LinkItem";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Gnb = () => {
  const [visible, setVisible] = useState(false);
  const path = usePathname();

  return (
    <>
      <div className="relative sm:hidden">
        <Hamburger
          size={30}
          onToggle={(toggled) => {
            if (toggled) setVisible(true);
            else setVisible(false);
          }}
        />
        {visible && (
          <ul className="flex flex-col gap-3 text-lg rounded-md absolute left-3 bg-white px-4 py-6">
            {pageList.map(({ id, href, label }, index) => {
              return (
                <li className={`w-full text-black border-b-4 border-gray-500 ${href === path ? 'text-purple-600' : ''} hover:text-purple-600`}>
                  <Link href={href} key={id}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ul className="hidden sm:flex">
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
