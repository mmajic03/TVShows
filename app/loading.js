//Ova komponenta se poziva dok se učitavaju podaci(npr. dohvaćaju s API-ja)
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-70 mb-6" />
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}
