import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Login } from './Pages/Onboarding/Login';
import { Signup } from './Pages/Onboarding/Signup';
import { Home } from './Pages/Dashboard/Home';
import { Logout } from './Components/Logout';
import { UpdateProfile } from './Pages/Profile/UpdateProfile';
import { ForgotPassword } from './Pages/Profile/ForgotPassword';
import ThreeDViewer from './Pages/3D/3DViewer';
import GoogleLoginPage from './Pages/Testing/GoogleLoginPage';
import GithubPage from './Components/GithubPage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
        <Route element={[<GithubPage />]}
            path="/"
          />
          <Route element={[<Login />]}
            path="/login"
          />
          <Route element={[<Signup/>]}
            path="/signup"
          />
          <Route element={[<Home/>]}
            path="/home"
          />
          <Route element={[<Logout/>]}
            path="/signout"
          />
          <Route element={[<UpdateProfile/>]}
            path="/updateProfile"
          />
          <Route element={[<ForgotPassword/>]}
            path="/forget"
          />
          <Route element={[<ThreeDViewer/>]}
            path="/threejs"
          />
          <Route element={[<GoogleLoginPage/>]}
            path="/testingGoogleLogin"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
