import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";

function NavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const currentPath = useLocation().pathname;
  let nextPath = '/profile'
  
  useEffect(() => {
    currentPath === '/profile' && (nextPath = '/home')

  }, [])

  const transitionNavBar = () => {
    if (window.scrollY > 100) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div
      className={`fixed top-0 p-[20px] w-full h-12 z-10 ${
        show && "bg-black"
      } duration-500`}
    >
      <div className="flex w-full h-full justify-between items-center">
        <img
          onClick={() => navigate({ pathname: "/home" })}
          className="fixed left-3 w-[100px] cursor-pointer object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="logo"
        />
        <img
          onClick={() => navigate({ pathname: nextPath })}
          className="fixed right-3 w-[30px] cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="profile"
        />
      </div>
    </div>
  );
}

export default NavBar;
