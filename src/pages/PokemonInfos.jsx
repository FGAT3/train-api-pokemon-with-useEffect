import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import capitalizeWords from "../scripts/capitalizeWords";

function PokemonInfos() {
  const { pokemonName } = useParams();
  const [pokemonInfos, setPokemonInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPokemonInfos = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        setPokemonInfos(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchPokemonInfos();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  } else {
        console.log(pokemonInfos);
      return (
        <>
          <h1>{capitalizeWords(pokemonInfos.name)}</h1>
          <img
            className="pokemon-img"
            src={pokemonInfos.sprites.front_default}
            alt=""
          />
        </>
      );
  }
}

export default PokemonInfos;
