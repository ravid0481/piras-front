// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './home.jsx';
import Report from './report.jsx';
import RecentIncidents from './RecentIncidents.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element ={<Report/>}/>
      <Route path="/RecentIncidents" element ={<RecentIncidents/>}/>
    </Routes>
  );
}

export default App;
