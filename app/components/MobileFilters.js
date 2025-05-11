export default function MobileFilters({setMobileFilter, mobileFilter, setGenreFilter, genreFilter, filter, setFilter, genres, sort}){
    return(
        <>
            <div className="flex flex-col gap-4 md:hidden p-4 mx-5"> 
                <button 
                    onClick={() => setMobileFilter(true)} 
                    className="w-90 bg-[#CC1B1B] text-white px-4 py-4 rounded ml-5 hover:bg-red-700">
                        Filters
                </button>
            </div>
        
            {mobileFilter && (
            <div className="fixed top-0 left-0 w-3/4 h-screen bg-white p-4 md:hidden overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                <h2 className=" text-xl font-bold">Filters</h2>
                <button onClick={() => setMobileFilter(false)}>
                    <p className="w-6 h-6 text-2xl">X</p>
                </button>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Genre</label>
                    <div className="flex flex-col gap-2">
                        {genres.map((genre) => (
                            <label key={genre} className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    checked={genreFilter === genre} 
                                    onChange={() => setGenreFilter(genreFilter === genre ? "All" : genre)}
                                />
                                <p>{genre}</p>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-4 mt-10">
                <label className="block font-semibold mb-2">Sort by</label>
                    <div className="flex flex-col gap-1">
                        {sort.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            checked={filter === option} 
                            onChange={() => setFilter(filter === option ? "All" : option)}/>
                        <p>{option}</p>
                        </label>
                    ))}
                    </div>
                </div>
            </div>
            )}
        </>
    );
}