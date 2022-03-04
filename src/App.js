
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import FrontPage from './pages/FrontPage';
import CreateLake from './pages/CreateLake';

function App() {
  return (
    <div className="App">
     <Navbar />

     <Routes>
     <Route path="/" element={ <FrontPage /> } />
     <Route path="/CreateLake" element={<CreateLake />} />

     <Route path="/signup" element={<SignupPage />}/>
     <Route path="/login" element={<LoginPage />} />
     
     

     </Routes>
    </div>
  );
}

export default App;
