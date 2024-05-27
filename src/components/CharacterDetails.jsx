import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CharacterDetails({ characterId, addToFavorite, isAddedToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat().slice(0, 6));
      } catch (error) {
        toast.error(error.response.data.error)
      } finally {
        setIsLoading(false);
      }
    }

    if (characterId) fetchData();
  }, [characterId]);

  if (isLoading)
    return (
      <div className="flex-1 text-white font-bold text-lg ml-40">
        <Loader />
      </div>
    );

  if (!character || !characterId)
    return (
      <div className="flex-1 text-white font-bold text-lg ml-40">
        Please Select Character...
      </div>
    );


  return (
    <div className="flex flex-col items-stretch flex-1">
      <CharacterInfo character={character} isAddedToFavourite={isAddedToFavourite} addToFavorite={addToFavorite}/>
      {/* episodes section */}
      <EpisodeList episodes={episodes}/>
    </div>
  );
}

export default CharacterDetails;

function CharacterInfo({character,addToFavorite,isAddedToFavourite}){
  return<div className="bg-gray-800 rounded-xl flex  mb-4 overflow-hidden md:ml-8">
  <img src={character.image} alt="" className="w-40 lg:w-52 " />
  <div className="flex flex-col text-white m-4">
    <span className="font-bold">
      {character.gender === "Male" ? "👨🏻" : "👩🏻‍🦳"}
      {character.name}
    </span>
    <span className=" mt-2 text-xs">
      {character.status === "Dead" ? "🔴" : "🟢"}
      {character.status}-{character.species}
    </span>
    <p className="text-gray-400 mt-4 text-sm">Last Known Location:</p>
    <div className="font-bold">{character.location.name}</div>
    {isAddedToFavourite ? (
      <div className=" rounded-3xl p-2 mt-4 text-sm w-full text-gray-500 ">
        Added To Favourite ✅
      </div>
    ) : (
      <button
        className="bg-gray-500 rounded-3xl p-2 mt-4 text-sm w-full"
        onClick={() => addToFavorite(character, character.id)}
      >
        Add To Favourite
      </button>
    )}
  </div>
</div>
}

function EpisodeList({ episodes }) {
  const [sort, setSort] = useState(true)
  // let sortedEpisodes;

  if(sort){
    episodes=[...episodes].sort((a,b)=>new Date(a.created) - new Date(b.created))
  }else{
    episodes=[...episodes].sort((a,b)=>new Date(b.created) - new Date(a.created))
  }
  return (
    <div className="bg-gray-800 rounded-xl md:ml-8 p-4 text-white">
        <div className="flex justify-between items-center ">
          <p className="text-gray-400">List Of Episodes:</p>
          <span>
            <ArrowUpCircleIcon
              className={`w-6 h-6 stroke-gray-400 ${sort ? "rotate-0" : "rotate-180"} transition-all duration-150` }
              onClick={()=>setSort(!sort)}
            />
          </span>
        </div>
        <div>
          {episodes.map((item, index) => (
            <ul className="my-2 text-sm" key={item.id}>
              <li className="text-gray-400 flex justify-between items-center">
                <div>
                  {String(index + 1).padStart(2, "0")} - {item.episode}:{" "}
                  <span className="font-bold text-white">{item.name}</span>
                </div>
                <div className="bg-gray-600 p-1.5 rounded-2xl text-white my-1">
                  {new Date(item.air_date).toLocaleDateString("US-en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
  );
}
