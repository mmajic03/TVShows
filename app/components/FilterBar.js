"use client";
import { useState } from "react";
import DesktopFilters from "./DesktopFilters";
import MobileFilters from "./MobileFilters";
export default function FilterBar({ genres, filter, setFilter, genreFilter, setGenreFilter}) {
  const [mobileFilter, setMobileFilter] = useState(false);
  const sort = ["All", "Latest", "Top rated"];
  
  return (
    <div className="mb-[-3px]">
      <DesktopFilters genreFilter={genreFilter} setGenreFilter={setGenreFilter} filter={filter} setFilter={setFilter} genres={genres}/>
      <MobileFilters setMobileFilter={setMobileFilter} mobileFilter={mobileFilter} setGenreFilter={setGenreFilter} genreFilter={genreFilter} filter={filter} setFilter={setFilter} genres={genres} sort={sort}/>
    </div>
  );
}
