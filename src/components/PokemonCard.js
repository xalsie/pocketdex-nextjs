import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon }) {
    return (
        <Link href={`/pokemon/${pokemon.pokedexId}`} className="block bg-gray-700 border rounded-lg p-2 shadow hover:shadow-lg transition ring shadow-xl ring-gray-900/5 hover:ring-gray-900/10">
            <div className="flex flex-col items-center gap-2">
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={96}
                    height={96}
                    className="rounded-full"
                />
                <div className="font-bold text-lg">
                    {pokemon.name}
                    <span className="text-gray-500 text-sm"> #{pokemon.pokedexId}</span>
                </div>
                <div className="flex gap-1 flex-wrap justify-center">
                    {pokemon.types?.map((type) => (

                        <div className="group relative rounded-full z-1" key={type.name}>
                            <Image
                                key={type.name}
                                src={type.image}
                                alt={type.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <div
                                className="bg-zinc-800 p-2 rounded-md group-hover:flex hidden absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2"
                            >
                            <span className="text-zinc-400 whitespace-nowrap">{type.name}</span>
                            <div
                                className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
                            ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    );
}
