import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Profiles from './Pages/Profiles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import SearchScrean from './Components/SearchScrean/SearchScrean';
import ResetPass from './Components/ForgotPassModal/ResetPass';
import axios from 'axios';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashHome from './Pages/Dashboard/DashHome';
import DashStratigys from './Pages/Dashboard/DashStratigys';
import DashboardUsers from './Pages/Dashboard/DashboardUsers';


function App() {
  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/forgot' element={<ResetPass />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/search" element={<SearchScrean />} />
          </Route>
          <Route element={<Dashboard />} >
            <Route exact path='/admin-home' element={<DashHome />} />
            <Route exact path='/admin-users' element={<DashboardUsers />} />
            <Route exact path='/admin-stratigy' element={<DashStratigys />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
