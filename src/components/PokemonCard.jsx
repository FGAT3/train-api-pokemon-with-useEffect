import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PokemonCard({ pokemonImage, pokemonName }) {
  return (
    <section className="card-section">
      <Link to={`/pokemon/${pokemonName.toLowerCase()}`}>
        <figure className="card">
          <img src={pokemonImage} alt="" className="pokemon-image" />
          <p className="pokemon-name">{pokemonName}</p>
        </figure>
      </Link>
    </section>
  );
}

PokemonCard.propTypes = {
  pokemonName: PropTypes.string.isRequired,
  pokemonImage: PropTypes.string.isRequired,
};

export default PokemonCard;
