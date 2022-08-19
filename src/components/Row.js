import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails, changePositionY } from "../redux/movieDetailsSlice";
import axios from "../axios";

function Row({ title, fetchURL, isLargeRow = false }) {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(null);

  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    try {
      async function fetchData() {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [fetchURL]);

  const handleClick = (id) => {
    dispatch(fetchMovieDetails(id))
    dispatch(changePositionY(window.scrollY))

  };

  return (
    <div className="mt-5">
      <h2 className="text-white text-2xl font-bold ml-5">{title}</h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide">
        {movies?.map(
          (e) =>
            ((isLargeRow && e.poster_path) ||
              (!isLargeRow && e.backdrop_path)) && (
              <img
                className={`${
                  isLargeRow ? "max-h-64" : "max-h-32"
                } object-contain mr-3 w-full duration-500 ${
                  isLargeRow ? "hover:scale-110" : "hover:scale-[1.08]"
                } hover:opacity-100 cursor-pointer`}
                key={e.id}
                src={`${baseURL}${
                  isLargeRow ? e.poster_path : e.backdrop_path
                }`}
                alt={e.name}
                onClick={() => handleClick(e.id)}
              />
            )
        )}
      </div>
      <div className="relative"></div>
    </div>
  );
}

export default Row;
