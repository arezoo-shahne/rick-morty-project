import { useEffect, useState } from "react";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    searchItem
  );
  const [characterId, setCharacterId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [favorite, setFavorite] = useLocalStorage("Favourites", []);

  const handleAddToFavorite = (char, id) => {
    if (favorite.find((item) => item.id === id)) return;
    setFavorite((prevState) => [...prevState, char]);
  };
  const handleShowCharDetails = (id) => {
    setCharacterId(id);
  };
  const isAddedToFavourite = favorite.map((i) => i.id).includes(characterId);

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
          isLoading={isLoading}
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
