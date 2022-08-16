import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

function SignIn() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setSignIn(!signIn);
  };

  return (
    <header
      className="relative h-screen object-cover text-white"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="relative h-full ">
        <div>
          <img
            onClick={() => navigate("/home")}
            className="fixed left-0 w-40 object-contain pl-5 cursor-pointer"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="logo"
          />
          <img
            onClick={() => navigate("/home")}
            className="fixed right-3 w-[30px] cursor-pointer mt-3"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile"
          />
          <div className=" bottom-0 h-screen w-full bg-gradient-to-t from-transparent to-loginfade" />
        </div>
        <div
          className={`absolute text-center inset-0 ${
            signIn ? "top-[20%] md:top-1/4" : "top-[20%] md:top-1/3"
          } px-2 mx-auto`}
        >
          <SignUp />
        </div>
      </div>
    </header>
  );
}

export default SignIn;
