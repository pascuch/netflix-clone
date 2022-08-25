import { useDispatch } from "react-redux";
import { cleanDetails, changePlayer } from "../../redux/movieDetailsSlice";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function BannerDetails({ details }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(cleanDetails());
    navigate(-1);
  };

  const handleClose = () => {
    dispatch(cleanDetails());
    navigate("/home");
  };

  const handlePlay = () => {
    dispatch(changePlayer(true));
  };

  return (
    <header
      className="relative h-[450px] text-white rounded-t-xl"
      style={
        details.backdrop_path && {
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('https://image.tmdb.org/t/p/original${details.backdrop_path}')`,
          backgroundPosition: "center top",
        }
      }
    >
      <div className="flex justify-between px-4 pt-4">
        <div
          onClick={handleBack}
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
      <div className="absolute bottom-[-70px] mb-44 ml-[30px] md:ml-10 pt-[100px] w-2/3">
        <h1 className="text-4xl md:text-5xl font-extrabold pb-1">
          {details.title}
        </h1>
        <div className="absolute flex mt-2 z-10">
          <button
            onClick={handlePlay}
            className="flex items-center font-bold rounded px-6 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 "
          >
            <FaPlay className="mr-2" />
            <h1>Play</h1>
          </button>
          <button className="flex items-center gap-1 font-bold rounded px-4 mr-4 bg-btn py-2 hover:text-black hover:bg-[#e6e6e6] duration-200 ">
            <IoAddCircleOutline className="text-2xl" />
            <h1>My List</h1>
          </button>
        </div>
      </div>
      <div className="absolute top-[322px] h-32 w-[800px] mx-auto bg-gradient-to-b from-transparent to-[#111111] z-0" />
    </header>
  );
}

export default BannerDetails;
