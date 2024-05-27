import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters, onShowDetails }) {
  return (
    <div className="flex flex-col items-center justify-center md:block">
      {characters.map((char) => (
        <CharacterItems key={char.id} item={char} onShowDetails={onShowDetails}>
          <button onClick={() => onShowDetails(char.id)}>
            <EyeIcon className="stroke-red-800 w-6 h-6 ml-10 lg:ml-40" />
          </button>
        </CharacterItems>
      ))}
    </div>
  );
}

export default CharacterList;

export function CharacterItems({ item, children }) {
  return (
    <div className="flex w-96 md:w-full items-center justify-between bg-gray-800 rounded-xl p-4 mb-4">
      <img
        src={item.image}
        alt=""
        className="rounded-xl row-span-2 w-16 mr-2"
      />
      <div className="flex flex-col  items-baseline text-white">
        <div className=" max-w-36 font-bold text-nowrap overflow-hidden">
          {item.gender === "Male" ? "👨🏻" : "👩🏻‍🦳"}
          {item.name}
        </div>
        <div className="mt-2 text-xs">
          {item.status === "Dead" ? "🔴" : "🟢"}
          {item.status}-{item.species}
        </div>
      </div>
      {children}
    </div>
  );
}
