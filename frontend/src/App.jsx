import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  LandingPage  from "./components/LandingPage";
import Topbar from "./components/Topbar"
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";


function App() {
  return <div>
      <Router>
      <Topbar />
      <LandingPage />
       <Routes>
       <Route path={"/Signup"} element={<SignupPage />} />
        <Route path={"/Login"} element={<LoginPage />} />
       </Routes>
      </Router>
  </div>
}

export default App
