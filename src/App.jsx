import { useEffect, useState } from "react";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [characters, setCharacters] = useState([]);
  const [characterId, setCharacterId] = useState(null);
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("Favourites")) || []
  );
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${searchItem}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [searchItem]);

  useEffect(() => {
    localStorage.setItem("Favourites", JSON.stringify(favorite));
  }, [favorite]);

  const handleAddToFavorite = (char, id) => {
    if (favorite.find((item) => item.id === id)) return;
    setFavorite((prevState) => [...prevState, char]);
  };
  const handleShowCharDetails = (id) => {
    setCharacterId(id);
  };
  const isAddedToFavourite = favorite.map((i) => i.id).includes(characterId);

  // if (isLoading)
  //   return (
  //     <div className="flex-1  font-bold text-lg ml-64 mt-40 text-red-400">
  //       <Loader />
  //     </div>
  //   );
  return (
    <div>
      <Toaster />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        favorite={favorite}
        setFavorite={setFavorite}
      />
      <Navbar
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        favorite={favorite}
        nomOfResult={characters.length}
        setOpenModal={setOpenModal}
      />
      <div className="flex flex-col-reverse md:flex-row justify-between  w-full mt-4">
        <CharacterList
          characters={characters}
          onShowDetails={handleShowCharDetails}
        />
        <CharacterDetails
          isAddedToFavourite={isAddedToFavourite}
          characterId={characterId}
          addToFavorite={handleAddToFavorite}
        />
      </div>
    </div>
  );
}

export default App;
