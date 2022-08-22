import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectShowDetails, selectPositionY } from "../redux/movieDetailsSlice";
import { useSearchParams } from "react-router-dom";
import Banner from "../components/Banner";
import NavBar from "../components/NavBar";
import Rows from "../components/Rows";
import Modal from "../components/Modal";

function HomeScreen() {
  const position = useSelector(selectPositionY);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams =
    searchParams.get("movie") ||
    searchParams.get("tv") ||
    searchParams.get("genre") ||
    searchParams.get("person");

  useEffect(() => {
    window.scrollTo(0, position);
  }, [queryParams, position]);

  return (
    <div className="relative">
      {queryParams && (
        <div className="fixed inset-0 h-100vh w-screen z-50 bg-black/70 ">
          <Modal />
        </div>
      )}
      <div
        className={`pb-8 w-full ${queryParams && `fixed bg-black`}`}
        style={{ top: queryParams && `-${position}px` }}
      >
        <NavBar />
        <Banner />
        <Rows />
      </div>
    </div>
  );
}

export default HomeScreen;
