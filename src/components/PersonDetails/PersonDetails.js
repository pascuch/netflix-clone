import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  selectPersonDetails,
  selectPersonMovieCast,
  cleanDetails,
  fetchPersonDetails,
  fetchPersonMovieCast
} from "../../redux/personDetailsSlice";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

function GenreDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector(selectPersonDetails);
  const movieCast = useSelector(selectPersonMovieCast)?.results;

  const [searchParams, setSearchParams] = useSearchParams();

  const personId = searchParams.get("person");

  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchPersonDetails(personId));
    dispatch(fetchPersonMovieCast(personId));
  }, [dispatch]);

  const handleClose = () => {
    dispatch(cleanDetails());
    navigate("/home");
  };

  const handleClick = (id) => {
    navigate(`/home?movie=${id}`)
  };

  return (
    <div className="relative text-white  h-screen overflow-y-scroll z-10">
      {details && (
        <div className="">
          <div className="flex">
            <div onClick={handleClose} className="grow" />
            <div className="grow-0 top-0 left-0 w-[800px] mt-8 mb-6 mx-auto bg-[#111111] rounded-xl">
              <div className="flex justify-between px-4 pt-4">
                <div
                  onClick={() => navigate(-1)}
                  className=" text-white bg-gray-800 hover:bg-gray-700 text-2xl p-2 rounded-full cursor-pointer"
                >
                  <IoArrowBack />
                </div>
                <div
                  onClick={handleClose}
                  className=" text-white bg-gray-800 hover:bg-gray-700 text-2xl p-2 rounded-full cursor-pointer"
                >
                  <IoMdClose />
                </div>
              </div>
              <h1 className="text-center text-4xl font-bold">
                {details.name}
              </h1>
              <div className="grid grid-cols-4 gap-5 mx-10 my-12">
                {movieCast?.map((e) => (
                  <img
                    className={`object-contain mr-3 w-full duration-500 hover:scale-[1.08] hover:opacity-100 cursor-pointer rounded-md`}
                    key={e.id}
                    src={`${baseURL}${e.poster_path}`}
                    alt={e.name}
                    onClick={() => handleClick(e.id)}
                  />
                ))}
              </div>
            </div>
            <div onClick={handleClose} className="grow" />
          </div>
        </div>
      )}
    </div>
  );
}

export default GenreDetails;
