//Ova komponenta se koristi kada treba korisniku prikazati da se podaci ili stranica
//trenutno učitavaju tj. da mora pričekati jer sadržaj još nije spreman za prikaz.
//Prikazuje se animirani vrteći kružić(animate-spin) i poruka 'Loading...'.
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-70 mb-6" />
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}
