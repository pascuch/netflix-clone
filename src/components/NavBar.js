import { useEffect, useState } from "react"

function NavBar() {
    const [show, setShow] = useState(false)

    const transitionNavBar = () => {
        if(window.scrollY > 100) setShow(true);
        else setShow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

  return (
    <div className={`fixed top-0 p-[20px] w-full h-[30px] z-10 ${show && 'bg-black'} duration-700`}>
        <div className="flex justify-between">
            <img 
                className="fixed left-0 top-[10px] w-[100px] pl-[20px] cursor-pointer object-contain"
                src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png'
                alt='logo' 
            />
            <img 
                className="fixed top-[5px] right-[20px] w-[30px] cursor-pointer"
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='profile'
            />
        </div>
    </div>
  )
}

export default NavBar