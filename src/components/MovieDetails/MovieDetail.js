import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovieDetails,
  getMovieDetailsStatus,
  getMovieDetailsError,
  cleanDetails,
  changePlayer,
  selectShowPlayer,
} from "../../redux/movieDetailsSlice";
import ReactPlayer from "react-player";
import AboutDetails from "./AboutDetails";
import BannerDetails from "./BannerDetails";
import MainDetails from "./MainDetails";

function MovieDetail() {
  const dispatch = useDispatch();
  const details = useSelector(selectMovieDetails);
  const showPlayer = useSelector(selectShowPlayer);
  const status = useSelector(getMovieDetailsStatus);
  const error = useSelector(getMovieDetailsError);

  const handleClose = () => {
    dispatch(cleanDetails());
  };

  const handleClosePlayer = () => {
    dispatch(changePlayer(false));
  };

  console.log(details)

  return (
    <div className="relative text-white  h-screen overflow-y-scroll z-10">
      {details && (
        <div className="">
          {showPlayer && (
            <div className="fixed w-screen h-screen z-50 bg-black/70">
              <div className="absolute w-4/6 h-4/6 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
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
                  url={`https://www.youtube.com/watch?v=${details.videos.results.find(e => e.name.toLowerCase().includes("official trailer") || e.name.toLowerCase().includes("trailer"))?.key}`}
                />
              </div>
              <div onClick={handleClosePlayer} className="fixed inset-0 w-screen h-screen -z-10" />
            </div>
          )}
          <div className="flex">
            <div onClick={handleClose} className="grow" />
            <div className="grow-0 top-0 left-0 w-[800px] mt-8 mb-6 mx-auto bg-[#111111] rounded-xl">
              <BannerDetails details={details} />
              <div className="px-12 text-sm">
                <MainDetails details={details} />
                <AboutDetails details={details} />
              </div>
            </div>
            <div onClick={handleClose} className="grow" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
