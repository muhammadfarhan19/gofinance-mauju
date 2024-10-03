import React from "react";
import DropdownUser from "./DropdownUser";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex justify-between items-center bg-[#0575E6] px-10">
      <Link
        className="text-xl md:text-2xl lg:text-3xl text-white font-semibold"
        href="/"
      >
        GoFinance
      </Link>
      <DropdownUser />
    </nav>
  );
};

export default Navbar;
