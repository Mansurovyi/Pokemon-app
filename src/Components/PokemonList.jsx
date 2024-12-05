import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonsList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
            .then((response) => {
                setPokemons(response.data.results);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Pokemons</h1>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <Link to={`/pokemon/${index + 1}`}>{pokemon.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonsList;
