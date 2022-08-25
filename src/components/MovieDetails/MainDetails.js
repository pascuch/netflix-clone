import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanDetails } from "../../redux/movieDetailsSlice";

function MainDetails({ details }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGenreClick = (id) => {
    dispatch(cleanDetails());
    navigate(`/home?genre=${id}`)
  }

  const handlePersonClick = (id) => {
    dispatch(cleanDetails());
    navigate(`/home?person=${id}`)
  }

  return (
    <main className="flex gap-x-20 mt-2">
      <div className="w-2/3">
        <div className="flex mb-8 gap-x-4 ">
          <div className="flex items-center text-yellow-200">
            <h3 className="font-bold mr-1">IMDB</h3>
            <h3 className="">{Math.round(details.vote_average * 10) / 10}</h3>
          </div>
          <h3>{details.release_date?.slice(0, 4)}</h3>
          <h3>{timeConvert(details.runtime)}</h3>
          <h3 className="font-extrabold">HD</h3>
        </div>
        <div>
          <p>{details.overview}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-y-4">
        <div>
          <p>
            <a href="." className="text-gray-500 cursor-default">
              Director:{" "}
            </a>
            <span onClick={() => handlePersonClick(details.credits.crew?.find((e) => e.job === "Director")?.id)} className="cursor-pointer hover:underline">
              {details.credits.crew?.find((e) => e.job === "Director")?.name}
            </span>
          </p>
        </div>

        <div>
          <p>
            <a href="." className="text-gray-500 cursor-default">
              Cast:{" "}
            </a>
            {details.credits.cast?.map((e, i) => {
              if (i < 3) {
                return (
                  <span onClick={() => handlePersonClick(e.id)} key={e.name} className="cursor-pointer hover:underline">
                    {e.name},{" "}
                  </span>
                );
              }
              if (i === 3) {
                return (
                  <span key={'more'} className="cursor-pointer hover:underline">
                    more...
                  </span>
                );
              }
            })}
          </p>
        </div>
        <div>
          <p>
            <a href="." className="text-gray-500 cursor-default">
              Genres:{" "}
            </a>
            {details.genres?.map((e, i) => {
              if (i === details.genres.length - 1) {
                return (
                  <span onClick={() => handleGenreClick(e.id)} key={e.name} className="cursor-pointer hover:underline">
                    {e.name}
                  </span>
                );
              } else {
                return (
                  <span onClick={() => handleGenreClick(e.id)} key={e.name} className="cursor-pointer hover:underline">
                    {e.name},{" "}
                  </span>
                );
              }
            })}
          </p>
        </div>
      </div>
    </main>
  );
}

export default MainDetails;

function timeConvert(n) {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m";
}
