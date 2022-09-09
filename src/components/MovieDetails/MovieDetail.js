import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovieDetails,
  getMovieDetailsStatus,
  getMovieDetailsError,
  cleanDetails,
  changePlayer,
  selectShowPlayer,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../../redux/movieDetailsSlice";
import ReactPlayer from "react-player";
import AboutDetails from "./AboutDetails";
import BannerDetails from "./BannerDetails";
import MainDetails from "./MainDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import MoreLikeThis from "./MoreLikeThis";

function MovieDetail() {
  const dispatch = useDispatch();
  const details = useSelector(selectMovieDetails);
  const showPlayer = useSelector(selectShowPlayer);
  const status = useSelector(getMovieDetailsStatus);
  const error = useSelector(getMovieDetailsError);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const movieId = searchParams.get("movie");

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchSimilarMovies(movieId));
    window.scrollTo(0, 1000);
  }, [movieId]);

  const handleClose = () => {
    dispatch(cleanDetails());
    navigate("/home");
  };

  const handleClosePlayer = () => {
    dispatch(changePlayer(false));
  };

  return (
    <div className="relative text-white  h-screen overflow-y-scroll z-10">
      {details && (
        <div className="">
          {showPlayer && (
            <div className="fixed w-screen h-screen z-50 bg-black/70">
              <div className="absolute w-full h-2/6 md:w-4/6 md:h-4/6 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                <ReactPlayer
                  style={{ borderRadius: "20px" }}
                  controls
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, autoplay: 1, rel: 0 },
                    },
                  }}
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${
                    details.videos.results.find((e) =>
                      e.name.toLowerCase().includes("official trailer")
                    )?.key ||
                    details.videos.results.find((e) =>
                      e.name.toLowerCase().includes("trailer")
                    )?.key ||
                    details.videos.results.find((e) =>
                      e.type.toLowerCase().includes("trailer")
                    )?.key ||
                    details.videos.results.find((e) => e)?.key
                  }`}
                />
              </div>
              <div
                onClick={handleClosePlayer}
                className="fixed inset-0 w-screen h-screen -z-10"
              />
            </div>
          )}
          <div className="flex">
            <div onClick={handleClose} className="hidden md:inline-block grow" />
            <div className="grow-0 top-0 left-0 w-screen md:w-[800px] md:mt-8 mb-6 bg-[#111111] rounded-xl overflow-y-auto overflow-x-hidden">
              <BannerDetails details={details} />
              <div className="px-4 md:px-12 text-sm">
                <MainDetails details={details} />
                <MoreLikeThis />
                <AboutDetails details={details} />
              </div>
            </div>
            <div onClick={handleClose} className="hidden md:inline-block grow" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
