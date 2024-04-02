import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import EditProfile from "./Components/Profile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/dashboard/profile" element={<EditProfile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
