import Image from "next/image";
import React from "react";
import TextLogo from "./text-logo";

export default function Footer() {
  return (
    <footer className="flex h-24 justify-between bg-slate-900 px-10">
      <TextLogo
        color="white"
        className="my-4 mr-8 flex items-center rounded-2xl px-3"
        style={{ textShadow: "#6366f1 -2px 2px 20px" }}
      />
      <div className="flex items-center pt-1 text-zinc-200">
        ⓒ {`${new Date().getFullYear()}`} Tindy, Inc. All rights reserved.
      </div>
    </footer>
  );
}
