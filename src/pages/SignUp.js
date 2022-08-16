import { useRef } from "react";
import { auth } from "../firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import facebook_logo from "../assests/images/facebook-logo.png";
import { useNavigate } from "react-router-dom";

function SignUp({ path }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((r) => {
        navigate(path);
      })
      .catch((e) => console.log(e.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        navigate(path);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="mx-2 md:max-w-md md:mx-auto bg-[#000000c7]">
      <form className="flex flex-col justify-items-center px-6 py-10 md:px-20 md:py-14">
        <h1 className="font-bold text-3xl text-center mb-5">Sign In</h1>
        <input
          className="h-10 mb-4 rounded outline-none py-1 px-3 text-black"
          type="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          className="h-10 mb-4 rounded outline-none py-1 px-3 text-black"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          className="py-3 px-5 bg-[#e50914] hover:bg-[#e3222c] rounded font-bold mt-3"
          type="submit"
          onClick={signIn}
        >
          Sign In
        </button>
        <div
          onClick={signInWithFacebook}
          className="flex bg-[#3b5998] mt-5 rounded py-3 px-5 justify-center items-center cursor-pointer"
        >
          <img className="h-5 mr-2" src={facebook_logo} alt="facebook-logo" />
          <h1 className="font-semibold">Login with Facebook</h1>
        </div>
        <h4 className="text-left mt-5 font-semibold">
          <span className="text-gray-400">New to Netflix? </span>
          <span onClick={register} className="cursor-pointer hover:underline">
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUp;
