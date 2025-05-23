//Komponenta omogućuje odabir žanra i načina sortiranja sadržaja na većim ekranima 
//putem padajućih izbornika(dropdown). 
"use client"
export default function DesktopFilters({genreFilter, setGenreFilter, filter, setFilter, genres}){
    return(
      <>
        <div className="hidden md:flex justify-between gap-4 mb-5 mx-7 mt-15">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-4 py-2 rounded border border-black bg-white text-black"
          >
            <option value="All" disabled>Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded border border-black bg-white text-black"
          >
            <option value="All">All</option>
            <option value="Latest">Latest(by premiere date)</option>
            <option value="Top rated">Top rated</option>
          </select>
        </div>
      </>
    );
}