"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ClickOutside from "./../shared/ClickOutside";
import { ArrowDownIcon, AvatarIcon, LogoutIcon, UserIcon } from "./../icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/UseUserData";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { push } = useRouter();
  const { data, loading, error } = useUser();

  const username = localStorage.getItem("username");

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full flex items-center">
          <AvatarIcon />
        </span>

        <div className="w-full">
          <div className="w-full flex justify-between items-center gap-x-2 cursor-pointer">
            <h1 className="font-bold text-white">{username}</h1>
            <ArrowDownIcon />
          </div>
          <h1 className="text-xs text-white">{data?.address.city}</h1>
        </div>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 flex w-40 flex-col rounded-xl overflow-hidden shadow-default z-10 bg-white`}
        >
          <Link
            href="/profile"
            className="flex py-2 text-white px-4 items-center gap-3.5 bg-[#0575E6] font-medium duration-300 ease-in-out hover:text-black hover:bg-white lg:text-base"
          >
            <UserIcon />
            <h1 className="text-sm">My Profile</h1>
          </Link>
          <button
            className="flex py-2 text-white px-4 items-center gap-3.5 bg-[#0575E6] font-medium duration-300 ease-in-out hover:text-black hover:bg-white lg:text-base"
            onClick={() => {
              Cookies.remove("token");
              localStorage.removeItem("username");
              push("/auth/login");
            }}
          >
            <LogoutIcon />
            <h1 className="text-sm">Logout</h1>
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
