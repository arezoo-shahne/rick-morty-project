import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({
  searchItem,
  setSearchItem,
  favorite,
  nomOfResult,
  setOpenModal,
}) {
  return (
    <nav className="bg-gray-700 p-4 rounded-xl flex justify-between items-center">
      <div className="text-white font-bold">
        <img
          src="../../assets/images/photo_2024-05-21_20-57-47.jpg"
          alt=""
          className="rounded-full"
        />
      </div>
      <input
        type="text"
        className="rounded-xl p-2 bg-gray-500 w-1/2 md:w-1/4"
        placeholder="Search ..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <p className="text-gray-400 hidden md:block">
        found {nomOfResult} Results
      </p>
      <div className="relative" onClick={() => setOpenModal(true)}>
        <HeartIcon className="stroke-red-700 w-8 h-8" />
        <span className="text-white text-[10px] absolute -top-1 -right-2 bg-red-600 rounded-full flex items-center justify-center w-5 h-5">
          {favorite.length}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
