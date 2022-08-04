import { useRef } from "react"
import { useDispatch } from "react-redux";
import { auth } from '../firebase'

function SignUp() {
    const dispatch = useDispatch()

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = e => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {console.log(authUser)})
        .catch((error) => alert(error.message))
    }

    const signIn = e => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(authUser => console.log('SIGNIN: ',authUser))
        .catch(error => alert(error.message))

        
    }

  return (
    <div className="max-w-md mx-auto bg-[#000000c7]">
        <form className="flex flex-col justify-items-center px-20 py-14">
            <h1 className="font-bold text-3xl text-center mb-5" >Sign In</h1>
            <input 
                className="h-10 mb-4 rounded outline-none py-1 px-3 text-black"
                type='email'
                placeholder="Email"
                ref={emailRef}
            />
            <input 
                className="h-10 mb-4 rounded outline-none py-1 px-3 text-black"
                type='password'
                placeholder="Password"
                ref={passwordRef}
            />
            <button className="py-3 px-5 bg-[#e50914] hover:bg-[#e3222c] rounded font-bold mt-3" type="submit" onClick={signIn}>Sign In</button>
            <h4 className="text-left mt-5 font-semibold">
                <span className="text-gray-400">New to Netflix? </span>
                <span onClick={register} className='cursor-pointer hover:underline'>Sign Up now.</span>
            </h4>
        </form>
    </div>
  )
}

export default SignUp