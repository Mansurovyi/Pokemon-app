import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

interface Pokemon {
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    sprites: { front_default: string };
}

const PokemonPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axiosClient.get(`pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error("Error fetching pokemon details:", error);
            } finally {
                setLoading(false);
            }
        };

         fetchPokemon();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pokemon) {
        return <p>Pokemon not found!</p>;
    }

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Abilities:</p>
            <ul>
                {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
            <p>Base Stats:</p>
            <ul>
                {pokemon.stats.map((stat, index) => (
                    <li key={index}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonPage;
