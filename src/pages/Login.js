import { useState } from "react"
import SignUp from "./SignUp"

function Login() {
    const [signIn, setSignIn] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setSignIn(!signIn)
    }

  return (
    <header
        className="relative h-screen object-cover text-white"
        style={{
            backgroundSize: 'cover',
            backgroundImage: `url('https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg')`,
            backgroundPosition: 'center center',
        }}
    >
        <div className="relative h-full ">
            <div>
                <img 
                    className="fixed left-0 w-40 object-contain pl-5"
                    src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                    alt='logo'
                />
                <button onClick={handleClick} className="fixed right-5 top-5 py-2 px-5 text-white text-lg bg-[#e50914] hover:bg-[#e3222c] font-bold cursor-pointer">Sign In</button>
                <div className=" bottom-0 h-screen w-full bg-gradient-to-t from-transparent to-loginfade"/>
            </div>
            <div className={`absolute text-center inset-0 ${signIn ? 'top-1/4' : 'top-1/3'}  mx-auto`}>
            {signIn ? (
                <SignUp /> )
                : (
                <div>
                    <h1 className="text-5xl font-bold p-5">Unlimited films, TV programms and more.</h1>
                    <h2 className="text-3xl font-normal pb-3">Watch anywhere. Cancel at any time.</h2>
                    <h3 className="text-lg font-normal">Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div>
                        <form className="flex justify-center p-5">
                            <input 
                                className="p-2.5 outline-none text-black h-10 w-1/3"
                                type='email'
                                placeholder="Email Address"
                            />
                            <button onClick={handleClick} className="text-base align-center font-bold hover:bg-[#e3222c] px-5 h-10 bg-[#e50914]">GET STARTED</button>
                        </form>
                    </div>
                </div>
                )
            }
            </div>
        </div>
    </header>
  )
}

export default Login