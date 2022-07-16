import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Profiles from './Pages/Profiles';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ResetPass from './Components/ForgotPassModal/ResetPass';
import axios from 'axios';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashHome from './Pages/Dashboard/DashHome';
import DashboardUsers from './Pages/Dashboard/DashboardUsers';
import Stratigy from './Pages/Stratigy';
import DashboardCSV from './Pages/Dashboard/DashboardCSV';
import UploadStratigys from './Pages/Dashboard/UploadStratigys';
import FindStratigys from './Pages/Dashboard/FindStratigys';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HindiStratiges from './Pages/Dashboard/HindiStratiges';
import UploadHindiStratiges from './Pages/Dashboard/UploadHindiStratiges';
import AdminAuth from './Components/AdminLogin/AdminAuth';
import PrivateAdminOutlet from './Components/PrivateRoute/PrivateAdminRoute';


function App() {
  const [displayProfile, setDisplayProfile] = React.useState("d-none");

  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
  // axios.defaults.baseURL = `http://localhost:8080/api/`;
  const handleOnclick = () => {
    setDisplayProfile('d-none')
  }
  const loc = useLocation()
  return (
    <div>
      {
        loc.pathname === '/admin-login' ||
          loc.pathname === '/admin-home' ||
          loc.pathname === '/admin-users' ||
          loc.pathname === '/admin-en-stratigy' ||
          loc.pathname === '/admin-hi-stratigy' ||
          loc.pathname === '/admin-upload-stratigy' ||
          loc.pathname === '/admin-upload-hi-stratigy'
          ? ('') : (
            <Navbar
              displayProfile={displayProfile}
              setDisplayProfile={setDisplayProfile}
            />
          )
      }
      <div className='App' onClick={handleOnclick}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/forgot' element={<ResetPass />} />
          <Route path='/admin-login' element={<AdminAuth />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/search" element={<Stratigy />} />
          </Route>
          <Route element={<PrivateAdminOutlet />} >
            <Route element={<Dashboard />} >
              <Route exact path='/admin-home' element={<DashHome />} />
              {/* <Route exact path='/admin-stratigy-dropDown' element={<FindStratigys />} /> */}
              <Route exact path='/admin-users' element={<DashboardUsers />} />
              <Route exact path='/admin-en-stratigy' element={<DashboardCSV />} />
              <Route exact path='/admin-hi-stratigy' element={<HindiStratiges />} />
              <Route exact path='/admin-upload-stratigy' element={<UploadStratigys />} />
              <Route exact path='/admin-upload-hi-stratigy' element={<UploadHindiStratiges />} />
            </Route>
          </Route>
        </Routes>
      </div>
      {
        loc.pathname === '/admin-login' ||
          loc.pathname === '/admin-home' ||
          loc.pathname === '/admin-users' ||
          loc.pathname === '/admin-en-stratigy' ||
          loc.pathname === '/admin-hi-stratigy' ||
          loc.pathname === '/admin-upload-stratigy' ||
          loc.pathname === '/admin-upload-hi-stratigy'
          ? ('') : (
            <Footer />
          )
      }
    </div>
  );
}

export default App;
