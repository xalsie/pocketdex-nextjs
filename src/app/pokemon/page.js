"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchPokemons, fetchTypes } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import PokemonFilters from "@/components/PokemonFilters";

export default function PokemonListPage() {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ name: "", types: [], limit: 50 });
    const [types, setTypes] = useState([]);
    const observer = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        fetchTypes().then(setTypes);
    }, []);

    useEffect(() => {
        setPokemons([]);
        setPage(1);
        setHasMore(true);
    }, [filters.name, filters.types, filters.limit]);

    useEffect(() => {
        if (!mounted) return;
        if (loading) return;
        setLoading(true);
        fetchPokemons({ page, limit: filters.limit, name: filters.name, types: filters.types })
            .then((data) => {
                setPokemons((prev) => page === 1 ? data : [...prev, ...data]);
                setHasMore(data.length === 50);
            })
            .finally(() => setLoading(false));
    }, [page, filters.name, filters.types, filters.limit, mounted]);

    const lastPokemonRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new window.IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    if (!mounted) return null;

    return (
        <div className="flex flex-col pt-8 gap-6 w-full max-w-4xl mx-auto">
            <PokemonFilters types={types} filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {pokemons.map((pokemon, idx) => (
                    <div
                        key={pokemon.pokedexId}
                        ref={idx === pokemons.length - 1 ? lastPokemonRef : null}
                    >
                        <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
            </div>
            {loading && <div className="text-center">Loading...</div>}
            {!hasMore && <div className="text-center">No more pokémons.</div>}
        </div>
    );
}
