import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

interface Pokemon {
    name: string;
    url: string;
}

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axiosClient.get("pokemon?limit=100");
                setPokemons(response.data.results);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Pokémon List</h1>
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

export default PokemonList;
