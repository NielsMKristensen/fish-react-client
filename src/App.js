
import './App.css';
import { Routes, Route } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateLake from './pages/CreateLake';
import LakeList from './pages/LakeList';
import LakeDetails from './pages/LakeDetails';
import EditLake from './pages/EditLake';
import OrderPermit from './pages/OrderPermit';
import NotOwner from './pages/NotOwner';
import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';
import IsLakeOwner from './components/isLakeOwner';
import Fishnavbar from './components/Navbar';

function App() {
  return (
    <div className="App">
     <Fishnavbar />

     <Routes>

     <Route path="/" element={ <LakeList /> } />
     <Route path="/CreateLake" element={<IsLakeOwner><CreateLake /></IsLakeOwner>} />
     <Route path="/lake/:_id" element={<IsPrivate><LakeDetails /></IsPrivate>} />
     <Route path="/lake/edit/:_id" element={<IsLakeOwner><EditLake /></IsLakeOwner> } />
     <Route path="/orderpermit" element={<IsPrivate><OrderPermit /></IsPrivate>} />
     
     {/* error route for non owners */}
     <Route path="/NotOwner" element={<NotOwner />} />

     <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}/>
     <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
     
     </Routes>
    </div>
  );
}

export default App;
