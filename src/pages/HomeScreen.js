import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectShowDetails, selectPositionY } from "../redux/movieDetailsSlice";
import Banner from "../components/Banner";
import MovieDetail from "../components/MovieDetails/MovieDetail";
import NavBar from "../components/NavBar";
import Rows from "../components/Rows";

function HomeScreen() {
  const showDetails = useSelector(selectShowDetails);
  const position = useSelector(selectPositionY);

  useEffect(() => {
    window.scrollTo(0, position);
  }, [showDetails, position]);

  return (
    <div className="relative">
      {showDetails && (
        <div className="fixed inset-0 h-100vh w-screen z-50 bg-black/70 ">
          <MovieDetail />
        </div>
      )}
      <div
        className={`pb-8 w-full ${showDetails && `fixed bg-black`}`}
        style={{ top: showDetails && `-${position}px` }}
      >
        <NavBar />
        <Banner />
        <Rows />
      </div>
    </div>
  );
}

export default HomeScreen;
