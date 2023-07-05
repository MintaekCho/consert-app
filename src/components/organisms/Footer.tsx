import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="w-full border-t p-8 mt-20">
      <div className="flex justify-between items-center">
        <p className="opacity-30">© Copyright 2023 CONCON All rights reserved.</p>
        <div className="text-4xl opacity-80">
          <a href="https://github.com/MintaekCho/consert-app" target="_blank">
            <AiFillGithub />
          </a>
        </div>
      </div>
    </div>
  );
}
