import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import Profiles from './Pages/Profiles';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ResetPass from './Components/ForgotPassModal/ResetPass';
import axios from 'axios';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashHome from './Pages/Dashboard/DashHome';
import DashboardUsers from './Pages/Dashboard/DashboardUsers';
import Stratigy from './Pages/Stratigy';
import DashboardCSV from './Pages/Dashboard/DashboardCSV';
import UploadStratigys from './Pages/Dashboard/UploadStratigys';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HindiStratiges from './Pages/Dashboard/HindiStratiges';
import UploadHindiStratiges from './Pages/Dashboard/UploadHindiStratiges';
import AdminAuth from './Components/AdminLogin/AdminAuth';
import PrivateAdminOutlet from './Components/PrivateRoute/PrivateAdminRoute';
import ReqAdminPanel from './Pages/Dashboard/ReqAdminPanel';
import ReqDelHindiStr from './Pages/Dashboard/ReqDelHindiStr';
import UploadEnglishStr from './Pages/Dashboard/adminReq/UploadEnglishStr';
import UploadHindistr from './Pages/Dashboard/adminReq/UploadHindistr';
import Verify from './Pages/Verify';
import EmailVerify from './Pages/EmailVerify';
import { getSingleUser } from './services/dashboardUsers';
import { useAuth } from './Context/AuthContext';
import AddForm from './Components/AddForm/AddForm';


function App() {
  const { user, setIsAuthenticated, setUser } = useAuth();
  const [displayProfile, setDisplayProfile] = React.useState("d-none");
  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
  // axios.defaults.baseURL = `http://localhost:8080/api/`;
  const handleOnclick = () => {
    setDisplayProfile('d-none')
  }
  const loc = useLocation();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('data'))
  // const handlesend = () => {
  //   axios.post('email')
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }

  React.useEffect(() => {
    if (data) {
      getSingleUser(data?._id)
        .then(res => {
          if (res?.data[0]?.email !== data?.email) {
            localStorage.removeItem('data');
            localStorage.removeItem('jwt');
            localStorage.removeItem('filterData');
            localStorage.removeItem('filterDataH');
            localStorage.removeItem('selectedDropdown');
            localStorage.removeItem('selectedHiDropdown');
            setIsAuthenticated(false)
            navigate('/')
            setUser(null);
            setDisplayProfile('d-none')
            console.log('email');
          }
        })
        .catch(err => {
          if (err) {
            localStorage.removeItem('data');
            localStorage.removeItem('jwt');
            localStorage.removeItem('filterData');
            localStorage.removeItem('filterDataH');
            localStorage.removeItem('selectedDropdown');
            localStorage.removeItem('selectedHiDropdown');
            setIsAuthenticated(false)
            console.log(err);
            setUser(null)
            navigate('/')
            setDisplayProfile('d-none')
          }
        })
    }
  }, [user, setIsAuthenticated, setUser, data]);


  return (
    <div className='App'>
      {
        loc.pathname === '/forgot' ||
          loc.pathname === '/verify' ||
          loc.pathname === '/emailverify' ||
          loc.pathname === '/admin-login' ||
          loc.pathname === '/admin-home' ||
          loc.pathname === '/admin-users' ||
          loc.pathname === '/admin-en-stratigy' ||
          loc.pathname === '/admin-hi-stratigy' ||
          loc.pathname === '/admin-upload-stratigy' ||
          loc.pathname === '/admin-upload-hi-stratigy' ||
          loc.pathname === '/super-req' ||
          loc.pathname === '/super-req-hi' ||
          loc.pathname === '/super-upEn-str' ||
          loc.pathname === '/super-upHi-str'
          ? ('') : (
            <Navbar
              displayProfile={displayProfile}
              setDisplayProfile={setDisplayProfile}
            />
          )
      }
      <div onClick={handleOnclick}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/forgot' element={<ResetPass />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/emailverify' element={<EmailVerify />} />
          <Route path='/admin-login' element={<AdminAuth />} />
          <Route path='/addForm' element={<AddForm />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/search" element={<Stratigy />} />
          </Route>
          <Route element={<PrivateAdminOutlet />} >
            <Route element={<Dashboard />} >
              <Route exact path='/admin-home' element={<DashHome />} />
              <Route exact path='/admin-users' element={<DashboardUsers />} />
              <Route exact path='/admin-en-stratigy' element={<DashboardCSV />} />
              <Route exact path='/admin-hi-stratigy' element={<HindiStratiges />} />
              <Route exact path='/admin-upload-stratigy' element={<UploadStratigys />} />
              <Route exact path='/admin-upload-hi-stratigy' element={<UploadHindiStratiges />} />
              <Route exact path='/super-req' element={<ReqAdminPanel />} />
              <Route exact path='/super-req-hi' element={<ReqDelHindiStr />} />
              <Route exact path='/super-upEn-str' element={<UploadEnglishStr />} />
              <Route exact path='/super-upHi-str' element={<UploadHindistr />} />
            </Route>
          </Route>
        </Routes>
      </div>
      {
        loc.pathname === '/forgot' ||
          loc.pathname === '/verify' ||
          loc.pathname === '/emailverify' ||
          loc.pathname === '/admin-login' ||
          loc.pathname === '/admin-home' ||
          loc.pathname === '/admin-users' ||
          loc.pathname === '/admin-en-stratigy' ||
          loc.pathname === '/admin-hi-stratigy' ||
          loc.pathname === '/admin-upload-stratigy' ||
          loc.pathname === '/admin-upload-hi-stratigy' ||
          loc.pathname === '/super-req' ||
          loc.pathname === '/super-req-hi' ||
          loc.pathname === '/super-upEn-str' ||
          loc.pathname === '/super-upHi-str'
          ? ('') : (
            <Footer />
          )
      }
      {/* <div>
        <button onClick={handlesend}>submits</button>
      </div> */}
    </div>
  );
}

export default App;
