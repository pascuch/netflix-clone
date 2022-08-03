import { useEffect, useState } from "react"
import axios from "../axios"

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([])

    const baseURL = 'https://image.tmdb.org/t/p/original'

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request
        }
        fetchData();
    }, [fetchURL])

  return (
    <div className="ml-5 mt-5">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
            {movies?.map(e => (
                ((isLargeRow && e.poster_path) || 
                (!isLargeRow && e.backdrop_path)) && ( 
                <img 
                    className={`${isLargeRow ? 'max-h-64' : 'max-h-28'} object-contain mr-3 w-full duration-500 ${isLargeRow ? 'hover:scale-110' : 'hover:scale-[1.08]'} hover:opacity-100`}
                    key={e.id}
                    src={`${baseURL}${isLargeRow ? e.poster_path : e.backdrop_path}`}
                    alt={e.name}
                />
                ))
            )}
        </div>
    </div>
  )
}

export default Row