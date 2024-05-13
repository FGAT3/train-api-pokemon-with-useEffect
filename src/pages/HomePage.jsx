import { useEffect, useState } from "react";
import capitalizeWords from "../scripts/capitalizeWords";
import noPokemonImg from "../assets/images/pikachu-error.png";
import { CardGroup, Card, Segment, Header, Image } from "semantic-ui-react";
import PokemonCard from "../components/PokemonCard";

function HomePage() {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"
        );
        const data = await response.json();
        const pokemonList = data.results;

        const detailsPromises = pokemonList.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return pokemonData;
        });

        const allDetails = await Promise.all(detailsPromises);
        setPokemonDetails(allDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    };

    fetchPokemonDetails();
  }, []);

  console.log(pokemonDetails);
  if (isLoading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }
  return (
    <>
      <Segment basic inverted>
        <Header as="h1">
          <h1>Welcome to your pokedex !</h1>
        </Header>
      </Segment>

      {pokemonDetails.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemonImage={pokemon.sprites.front_default}
          pokemonName={capitalizeWords(pokemon.name)}
        />
      ))}

      {/* <CardGroup centered itemsPerRow={3}>
        {pokemonDetails.map((pokemon) => (
          <Card key={pokemon.id}>
            <Image src={pokemon.sprites.front_default} wrapped ui={false} />
          </Card>
        ))}
      </CardGroup> */}

      {/* <h1>oui oui</h1>
      <h1>svscscdv</h1>
      {pokemonDetails.map((pokemon) => <img
                  className="pokemon-img"
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} picture`}
                  key={pokemon.id}
                />)} */}
      {/* <section className="swipe-pokemon-cards">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="mySwiper"
        >
          {pokemonDetails.map((pokemon) => (
            <SwiperSlide key={pokemon.id}>
              {pokemon.sprites.front_default ? (
                <img
                  className="pokemon-img"
                  pokemonDetails[0].sprites.font_default={pokemon.sprites.front_default}
                  alt={`${pokemon.name} picture`}
                />
              ) : (
                <>
                  <img
                    className="no-pokemon-img"
                    pokemonDetails[0].sprites.font_default={noPokemonImg}
                    alt={"No picture available for this pokemon"}
                  />
                  <p className="no-pokemon-text">
                    No picture available for this Pokémon
                  </p>
                </>
              )}
              <p className="pokemon-name">{capitalizeWords(pokemon.name)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <p className="counter-pokemon-list">
        {counterPokemonList} / {newPokemonList.count}{" "}
      </p>

      <section className="button-container">
        <button
          type="button"
          className="prev-button"
          onClick={() => {
            counterPokemonList > pokemonList.results.length &&
              setCounterPokemonList((prevCount) =>
                Math.max(prevCount - newPokemonList.results.length, 0)
              ),
              handlePokemonClick(newPokemonList.previous);
          }}
        >
          Previous
        </button>

        <button
          type="button"
          className="next-button"
          onClick={() => {
            if (counterPokemonList < pokemonList.count)
              setCounterPokemonList((prevCount) =>
                Math.min(
                  prevCount + newPokemonList.results.length,
                  pokemonList.count
                )
              );
            if (newPokemonList.next) {
              handlePokemonClick(newPokemonList.next);
            }
          }}
        >
          Next
        </button>
      </section> */}
    </>
  );
}

export default HomePage;
