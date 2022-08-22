import { useEffect, useState } from "react";
import Row from "./Row";
import requests from "../Requests";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, selectGenres } from "../redux/genreDetailsSlice";

function Rows() {
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(fetchGenres())
  }, []);

  const showRows = () => {
    if (window.scrollY > 500) setShow(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", showRows);
    return () => window.removeEventListener("scroll", showRows);
  }, []);

  return (
    <div>
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
        delay={0}
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} delay={0.5} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} delay={1} />
      {show &&
        genres?.map((e, i) => {
          if (i < 20)
            return (
              <Row
                key={e.id}
                title={e.name}
                fetchURL={`${requests.fetchMoviesByGenre}${e.id}`}
                delay={1 + (i + 1) * 0.5}
              />
            );
        })}
    </div>
  );
}

export default Rows;
