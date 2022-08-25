import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSimilarMovies } from "../../redux/movieDetailsSlice";

function MoreLikeThis() {
  const navigate = useNavigate();
  const similar = useSelector(selectSimilarMovies)?.results;

  const baseURL = "https://image.tmdb.org/t/p/original";

  const handleClick = async (id) => {
    await navigate('/home')
    navigate(`/home?movie=${id}`);
  };

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold">More Like This</h1>
      <div className="grid grid-cols-4 gap-5 mb-12 mt-8">
        {similar?.map((e, i) => {
          if (i < 12)
            return (
                <img
                  className={`object-contain w-full duration-500 hover:scale-[1.08] hover:opacity-100 cursor-pointer rounded-md`}
                  key={e.id}
                  src={`${baseURL}${e.poster_path}`}
                  alt={e.name}
                  onClick={() => handleClick(e.id)}
                />
            );
        })}
      </div>
    </div>
  );
}

export default MoreLikeThis;
