import Image from "next/image";
export default function CastCard({ cast }) {
  return (
    <div className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20">
      <Image 
        src={cast.person.image?.medium || "/person.jpg"} 
        alt={cast.person.name}
        width={300}
        height={450}
        className="object-cover rounded-t-2xl" 
      />
      <div className="flex flex-col text-center p-4 gap-2">
        <h2 className="text-xl font-semibold text-black">{cast.person.name}</h2>
        <p className="text-sm text-gray-600">as <span className="text-red-600">{cast.character.name}</span></p>
      </div>
    </div>
  );
}
