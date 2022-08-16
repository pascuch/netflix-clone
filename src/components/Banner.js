import { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../Requests";
import { FaPlay } from 'react-icons/fa'

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
            backgroundPosition: 'center top',
        }}
    >
        <div className="absolute bottom-0 mb-44  ml-[30px] md:ml-20 pt-[140px] h-[250px]">
            <h1 className="text-4xl md:text-5xl font-extrabold pb-1">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>          
            <div className="flex mt-2">
                <button className="flex items-center font-bold rounded px-6 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 ">
                    <FaPlay className="mr-2" />
                    <h1>Play</h1>
                </button>
                <button className="font-bold rounded px-8 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 ">My List</button>
            </div>
            <h1 className="leading-5 pr-4 pt-4 text-sm md:text-base font-bold max-w-sm h-20">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-black"/>
    </header>
  )
}

export default Banner