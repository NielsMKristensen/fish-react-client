
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateLake from './pages/CreateLake';
import LakeList from './pages/LakeList';
import LakeDetails from './pages/LakeDetails';
import EditLake from './pages/EditLake';

function App() {
  return (
    <div className="App">
     <Navbar />

     <Routes>
     {/* <Route path="/" element={ <FrontPage /> } /> */}
     <Route path="/" element={ <LakeList /> } />
     <Route path="/CreateLake" element={<CreateLake />} />
     <Route path="/lake/:_id" element={<LakeDetails />} />
     <Route path="/lake/edit/:_id" element={<EditLake /> } />

     <Route path="/signup" element={<SignupPage />}/>
     <Route path="/login" element={<LoginPage />} />
     
     

     </Routes>
    </div>
  );
}

export default App;
