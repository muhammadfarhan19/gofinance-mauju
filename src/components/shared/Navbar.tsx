import React from "react";
import DropdownUser from "./DropdownUser";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex justify-end items-center bg-[#0575E6] px-10">
      {/* <aside className="w-52 px-4 py-2 grid grid-cols-3"> */}
      {/* <div className="col-span-1 grid place-items-center">
          <AvatarIcon />
        </div> */}
      <DropdownUser />
      {/* <div className="grid col-span-2">
          <div className="w-full flex items-center gap-x-2 cursor-pointer">
            <h1 className="font-bold text-white">Nama User</h1>
            <ArrowDownIcon />
          </div>
          <h1 className="text-xs text-white">Jabatan</h1>
        </div> */}
      {/* </aside> */}
    </nav>
  );
};

export default Navbar;
