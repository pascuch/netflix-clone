import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import Login from "./pages/Login";
import { auth } from './firebase'
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/userSlice'
import Profile from "./pages/Profile";

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
            <Route path='/profile' element={<Profile />} />
            <Route path="/" element={!user ? <Login /> : <HomeScreen />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
