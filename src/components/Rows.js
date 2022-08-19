import { useEffect, useState } from "react";
import axios from "../axios";
import Row from "./Row";
import requests from "../Requests";

function Rows() {
  const [genres, setGenres] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      async function fetchData() {
        const request = await axios.get(requests.fetchGenres);
        setGenres(request.data.genres);
        return request;
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
}, []);

const showRows = () => {
    if(window.scrollY > 500) setShow(true)
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
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      {show && genres?.map((e, i) => {
        if (i < 20)
          return (
            <Row
              key={e.id}
              title={e.name}
              fetchURL={`${requests.fetchMoviesByGenre}${e.id}`}
            />
          );
      })}
    </div>
  );
}

export default Rows;
