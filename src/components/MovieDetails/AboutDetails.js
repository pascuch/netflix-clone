import { useNavigate } from "react-router-dom";

function AboutDetails({ details }) {
  const navigate = useNavigate()

  const handleGenreClick = (id) => {
    navigate(`/home?genre=${id}`)
  }

  const handlePersonClick = (id) => {
    navigate(`/home?person=${id}`)
  }

  return (
    <div className="my-8">
      <div className="flex text-3xl mb-8">
        <h1>About</h1>
        <h1 className="font-bold ml-2">{details.title}</h1>
      </div>
      <div className="flex flex-col gap-y-3">
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
              if (i === 50 || i === details.credits.cast.length - 1) {
                return (
                  <span onClick={() => handlePersonClick(e.id)} key={e.name} className="cursor-pointer hover:underline">{e.name}</span>
                );
              }
              if (i < 50) {
                return (
                  <span onClick={() => handlePersonClick(e.id)} key={e.name} className="cursor-pointer hover:underline">{e.name}, </span>
                );
              }
            })}
          </p>
        </div>
        <div>
          <p>
            <a href="." className="text-gray-500 cursor-default">
              Writer:{" "}
            </a>
            <span className="cursor-pointer hover:underline">
              {details.credits.crew?.find((e) => e.job === "Writer")?.name
                ? details.credits.crew?.find((e) => e.job === "Writer")?.name
                : details.credits.crew?.find((e) => e.job === "Director")?.name}
            </span>
          </p>
        </div>
        <div>
          <p>
            <span className="text-gray-500 cursor-default">
              Genres:{" "}
            </span>
            {details.genres?.map((e, i) => {
              if (i === details.genres.length - 1) {
                return (
                  <span onClick={() => handleGenreClick(e.id)} key={e.name} className="cursor-pointer hover:underline">{e.name}</span>
                );
              } else {
                return (
                  <span onClick={() => handleGenreClick(e.id)} key={e.name} className="cursor-pointer hover:underline">{e.name}, </span>
                );
              }
            })}
          </p>
        </div>
        <p className="text-gray-500">
          Release:{" "}
          <span className="text-white">{details.release_date?.slice(0, 4)}</span>
        </p>
        <p className="text-gray-500">
          Runtime:{" "}
          <span className="text-white">{timeConvert(details.runtime)}</span>
        </p>
      </div>
    </div>
  );
}

export default AboutDetails;

function timeConvert(n) {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m";
}
