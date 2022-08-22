import { useSearchParams } from "react-router-dom";
import GenreDetails from "./GenreDetails/GenreDetails";
import MovieDetail from "./MovieDetails/MovieDetail";
import TvDetails from "./TvDetails/TvDetails";
import PersonDetails from './PersonDetails/PersonDetails'

function Modal() {
  const [searchParams, setSearchParams] = useSearchParams();

  const movieId = searchParams.get('movie')
  const tvId = searchParams.get('tv')
  const genreId = searchParams.get('genre')
  const personId = searchParams.get('person')

  return (
  <div>
    {movieId && <MovieDetail />}
    {tvId && <TvDetails />}
    {genreId && <GenreDetails />}
    {personId && <PersonDetails />}
  </div>
  );
}

export default Modal;
