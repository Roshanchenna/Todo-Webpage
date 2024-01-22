import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  LandingPage  from "./components/LandingPage";
import Topbar from "./components/Topbar"
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import TodoWindow from "./components/TodoWindow";
import { RecoilRoot } from 'recoil';

function App() {
  return <div>
      <RecoilRoot>
      <Router>
      <Topbar />
       <Routes>
       <Route path={"/"} element={<LandingPage />} />
       <Route path={"/SignupPage"} element={<SignupPage />} />
        <Route path={"/LoginPage"} element={<LoginPage />} />
        <Route path={"/TodoWindow"} element={<TodoWindow />} />
       </Routes>
      </Router>
      </RecoilRoot>
  </div>
}

export default App
