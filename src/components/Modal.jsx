import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import CharacterItems from "./CharacterList";

function Modal({ setOpenModal, openModal, favorite ,setFavorite}) {
  const handleRemoveFavoriteItem=(itemId)=>{
    setFavorite((prevState)=>prevState.filter(item=>item.id!==itemId))
  }
  if (!openModal) return;
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-gray-600 opacity-80 w-screen h-screen fixed inset-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="bg-gray-800 shadow-xl rounded-xl min-w-96 absolute top-1/3 lg:left-1/3 p-4 text-white my-0 mx-auto">
        <div className="flex items-center justify-between border-b-2 border-gray-700 pb-2">
          <h2 className="font-bold text-xl">Favorite List</h2>
          <span>
            <XCircleIcon
              className="w-6 h-6 stroke-red-400"
              onClick={() => setOpenModal(false)}
            />
          </span>
        </div>
        <div>
          {favorite.map((item) => {
            return (
              <div key={item.id} className="flex items-center justify-between p-2 bg-gray-700 hover:bg-gray-600  rounded-xl my-3">
                <img className="rounded-xl row-span-2 w-16 mr-2" src={item.image} alt="" />
                <p>{item.name}</p>
                <TrashIcon className="stroke-red-400 w-6 h-6 ml-20 md:ml-40" onClick={()=>handleRemoveFavoriteItem(item.id)}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Modal;
