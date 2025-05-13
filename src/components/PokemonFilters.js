"use client";

import MultiSelectDropdown from "@/components/MultiSelectDropdown";

export default function PokemonFilters({ types, filters, setFilters }) {
    return (
        <form
            className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="relative">
                <input
                    placeholder="Recherchez un Pokémon"
                    className="shadow-lg border-gray-300 px-5 py-3 rounded-xl w-64 outline-none bg-gray-200 p-4 rounded-lg shadow-md"
                    name="search"
                    type="search"
                    value={filters.name || ''}
                    onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
                    autoComplete="off"
                />

                <select
                    className="shadow-lg border-gray-300 px-5 py-3 rounded-xl w-auto outline-none bg-gray-200 rounded-lg shadow-md ml-4"
                    value={filters.limit || 50}
                    onChange={e => setFilters(f => ({ ...f, limit: Number(e.target.value) }))}
                >
                    {[10, 20, 30, 40, 50].map(val => (
                        <option key={`limit-${val}`} value={val}>{val} par page</option>
                    ))}
                </select>
            </div>

            <MultiSelectDropdown
                formFieldName={"countries"}
                options={types}
                onChange={(selected) => {
                    setFilters((f) => {
                        const selectedTypes = selected.map((s) => s.id);
                        return {
                            ...f,
                            types: selectedTypes,
                        };
                    });
                }}
                placeHolder="Select one or more types"
            />
        </form>
    );
}
