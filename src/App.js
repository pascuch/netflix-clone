import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import LandingPage from "./pages/LandingPage";
import { auth } from './firebase'
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './redux/userSlice'
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })

    return unsuscribe
  }, [dispatch])

  return (
    <div className="bg-black">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage /> } />
            <Route path="/home" element={<HomeScreen /> } />            
            <Route path="/signin" element={<SignIn /> } />            
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
