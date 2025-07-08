import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home.js';
import Navbar from './components/pages/Navbar.js';
import LoginForm from './components/pages/LoginForm.js';
import RegisterForm from './components/pages/RegisterForm.js';
import Profile from './components/pages/Profile.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
