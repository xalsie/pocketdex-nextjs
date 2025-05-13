import { fetchPokemonDetail } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function PokemonDetailPage({ params }) {
    const { id } = params;
    const pokemon = await fetchPokemonDetail(id);

    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-6">
            <Link href="/pokemon" className="text-blue-600 hover:underline">← Retour à la liste</Link>
            <div className="flex flex-col justify-center items-center gap-4 bg-gray-700 p-4 rounded-lg shadow">
                <div className="flex flex-col items-center gap-4">
                    <Image src={pokemon.image} alt={pokemon.name} width={128} height={128} />
                    <h1 className="text-2xl font-bold">
                        {pokemon.name}
                        <span className="text-gray-500 text-sm"> #{pokemon.pokedexId}</span>
                    </h1>
                    <div className="flex gap-2">
                        {pokemon.apiTypes?.map((type) => (
                            <span key={type.name} className="px-2 py-0.5 rounded bg-gray-200 text-xs">
                                {type.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full p-4">
                    <h2 className="font-semibold mb-2">Stats</h2>
                    <ul className="grid grid-cols-2 gap-2">
                        {pokemon.stats &&
                            Object.entries(pokemon.stats).map(([name, value]) => (
                                <li key={name} className="flex justify-between">
                                    <span>{name}</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* si pas d'evolution hide block */}
            {pokemon.evolutions?.length === 0 && (
                <div className="bg-gray-700 flex flex-col items-center justify-center p-4 rounded-lg shadow">
                    <h2 className="font-semibold">Pas d'évolutions</h2>
                </div>
            )}
            {/* si evolutions */}
            {pokemon.evolutions?.length > 0 && (
                <div className="bg-gray-700 flex flex-col items-center justify-center p-4 rounded-lg shadow">
                    <h2 className="font-semibold">Évolutions</h2>
                    <div className="flex gap-4 justify-center overflow-x-auto w-full">
                        {pokemon.evolutions?.map((evo) => (
                            <EvolutionLink key={evo.pokedexId} pokedexId={evo.pokedexId} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

async function EvolutionLink({ pokedexId }) {
    const evo = await fetchPokemonDetail(pokedexId);
    return (
        <Link href={`/pokemon/${evo.pokedexId}`} className="flex flex-col items-center hover:underline">
            <Image src={evo.image} alt={evo.name} width={96} height={96} />
            <h1 className="text-2xl font-bold">
                {evo.name}
                <span className="text-gray-500 text-sm"> #{evo.pokedexId}</span>
            </h1>
        </Link>
    );
}
