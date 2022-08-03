import { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../Requests";

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            )
            return request
        };
        
        fetchData()
    }, [])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

  return (
    <header
        className="relative h-[500px] object-contain text-white"
        style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
        }}
    >
        <div className="ml-[30px] pt-[140px] h-[250px]">
            <h1 className="text-5xl font-extrabold pb-1">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="mt-2">
                <button className="font-bold rounded-[0.2vw] px-8 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 ">Play</button>
                <button className="font-bold rounded-[0.2vw] px-8 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 ">My List</button>
            </div>
            <h1 className="w-[45rem] leading-5 pt-4 text-sm font-bold max-w-sm h-20">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-black"/>
    </header>
  )
}

export default Banner