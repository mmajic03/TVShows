import Image from "next/image";
export default function CrewCard({ crew }) {
  return (
    <div className="flex flex-col w-full max-w-[300px] bg-white shadow-md hover:shadow-lg rounded-2xl mb-20">
        <Image 
            src={crew.person.image?.medium || "/person.jpg"} 
            alt={crew.person.name} 
            width={300} 
            height={450}
            className="w-full h-[450px] object-cover rounded-t-2xl" 
        />
        <div className="flex flex-col text-center p-4 gap-2">
            <h2 className="text-xl font-semibold text-black">{crew.person.name}</h2>
            <p className="text-sm text-gray-600">as <span className="text-red-600">{crew.type}</span></p>
        </div>
    </div>
  );
}
