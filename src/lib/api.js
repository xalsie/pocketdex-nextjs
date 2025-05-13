// Utility functions for consuming the Pokedex API
const API_BASE = "https://nestjs-pokedex-api.vercel.app";

export async function fetchPokemons({ page = 1, limit = 50, name = "", types = [] } = {}) {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });
    if (name) params.append("name", name);
    if (types.length) types.forEach((t) => params.append("types", t));
    const res = await fetch(`${API_BASE}/pokemons/?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch pokemons");
    return res.json();
}

export async function fetchTypes() {
    const res = await fetch(`${API_BASE}/types`);
    if (!res.ok) throw new Error("Failed to fetch types");
    return res.json();
}

export async function fetchPokemonDetail(pokedexId) {
    const res = await fetch(`${API_BASE}/pokemons/${pokedexId}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon detail");
    return res.json();
}
