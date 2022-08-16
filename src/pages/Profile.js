import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Plans from "../components/Plans";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import SignUp from "./SignUp";

function Profile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate({ pathname: "/" });
  };

  return (
    <div className="h-screen text-white">
      <NavBar />
      {!user ? (
        <div className="pt-20">
          <SignUp path="/profile" />
        </div>
      ) : (
        <div className="flex flex-col w-full md:w-1/2 mx-auto pt-16 md:pt-[8%] max-w-2xl px-5">
          <h1 className="text-3xl md:text-5xl font-semibold border-b-2 border-[#282c2d] mb-5">
            Edit Profile
          </h1>
          <div className="flex">
            <img
              className="h-24 hidden md:inline-block"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="profile"
            />
            <div className="md:ml-6 flex-1">
              <h2 className="bg-[gray] py-2 px-5 text-lg">{user.email}</h2>
              <div>
                <Plans />
                <button
                  onClick={handleSignOut}
                  className="py-2.5 px-5 bg-[#e50914] hover:bg-[#e3222c] mt-4 w-full font-bold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
