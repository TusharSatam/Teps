import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AddForm from './Components/AddForm/AddForm';
import AdminAuth from './Components/AdminLogin/AdminAuth';
import Footer from './Components/Footer/Footer';
import ResetPass from './Components/ForgotPassModal/ResetPass';
import Navbar from './Components/Navbar/Navbar';
import PrivateAdminOutlet from './Components/PrivateRoute/PrivateAdminRoute';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { useAuth } from './Context/AuthContext';
import UploadEnglishStr from './Pages/Dashboard/adminReq/UploadEnglishStr';
import UploadHindistr from './Pages/Dashboard/adminReq/UploadHindistr';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashboardCSV from './Pages/Dashboard/DashboardCSV';
import DashboardUsers from './Pages/Dashboard/DashboardUsers';
import DashComments from './Pages/Dashboard/DashComments';
import DashHome from './Pages/Dashboard/DashHome';
import DeviceList from './Pages/Dashboard/DeviceList';
import HindiStratiges from './Pages/Dashboard/HindiStratiges';
import ReqAdminPanel from './Pages/Dashboard/ReqAdminPanel';
import ReqDelHindiStr from './Pages/Dashboard/ReqDelHindiStr';
import UploadHindiStratiges from './Pages/Dashboard/UploadHindiStratiges';
import UploadStratigys from './Pages/Dashboard/UploadStratigys';
import UserDetails from './Pages/Dashboard/UserDetails';
import ApproveEn from './Pages/Dashboard/userReq/ApproveEn';
import ApproveHi from './Pages/Dashboard/userReq/ApproveHi';
import UserReqEn from './Pages/Dashboard/userReq/UserReqEn';
import UserReqHi from './Pages/Dashboard/userReq/UserReqHi';
import EmailVerify from './Pages/EmailVerify';
import FavouriteStr from './Pages/FavouriteStr';
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import Profiles from './Pages/Profiles';
import SaveStratigy from './Pages/SaveStratigy';
import SingleHindiStr from './Pages/SingleHindiStr';
import SingleStr from './Pages/SingleStr';
import SingleUserStr from './Pages/SingleUserStr';
import Stratigy from './Pages/Stratigy';
import Verify from './Pages/Verify';
import EditStrategy from './Components/EditStrategy/EditStrategyForm';
import EditedStratigy from './Pages/EditedStratigy'
import CreatedStratigy from './Pages/CreatedStratigy'
import OthersProfile from './Components/Profile/OthersProfile';
import FoundationalLearning from './Pages/FoundationalLearning';
import Resources from './Pages/Resources';
import Subscription from './Pages/Subscription';
import PaymentInformation from './Pages/PaymentInformation';
import AddResources from './Pages/Dashboard/AddResources';
import AllResources from './Pages/Dashboard/AllResources';
import EmailTemplate from './Pages/Dashboard/EmailTemplate';
import OtherCreatedStratigies from './Pages/OtherCreatedStratigies';
import OtherFavouriteStrategies from './Pages/OtherFavouriteStrategies';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsConditions from './Pages/TermsConditions';
import PaymentTerms from './Pages/PaymentTerms';
import PofileReminderModal from './Components/Home/ProfileReminderModal';

function App() {
  const {isAuthenticated, isPlanExpired,user } = useAuth();
  const [showProfileModal, setshowProfileModal] = useState(false);
  const [displayProfile, setDisplayProfile] = React.useState("d-none");
  axios.defaults.baseURL =  `${process.env.REACT_APP_BASE_URL}`;
  axios.defaults.headers["Authorization"] = "Bearer yourAccessToken";
  useEffect(() => {
  console.log(isPlanExpired);
}, [isPlanExpired])

  const handleOnclick = () => {
    setDisplayProfile('d-none')
  }
  const loc = useLocation();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('data'))
useEffect(() => {
  if(isAuthenticated  && loc.pathname === '/'){
    navigate("/home")
  }
}, [isAuthenticated])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [loc.pathname]);
  useEffect(() => {
    if(user){
      if (!user?.country || !user?.state || !user?.email || !user?.phoneNumber || !user?.organization ||!user?.pincode) {
        setTimeout(() => {
          setshowProfileModal(true);
        }, 100000);
      }
    }
  }, [user]);

  return (
    <div className='App'>
            <PofileReminderModal
              show={showProfileModal}
              setShow={setshowProfileModal}
            />
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
          loc.pathname === '/super-upHi-str' ||
          loc.pathname === '/approve-en' ||
          loc.pathname === '/approve-hi' ||
          loc.pathname === '/reqbyuser-en' ||
          loc.pathname === '/reqbyuser-hi' ||
          loc.pathname === '/admin-comments' ||
          loc.pathname === '/browsers-devices' ||
          loc.pathname === '/add-resources' ||
          loc.pathname === '/all-resources' ||
          loc.pathname === '/email-template' ||
          loc.pathname === '/privacy-policy' ||
          loc.pathname === '/payment-terms' ||
          loc.pathname === '/terms-conditions' ||
          loc.pathname.includes('/user-details')
          ? ('') : (
            <Navbar
              displayProfile={displayProfile}
              setDisplayProfile={setDisplayProfile}
            />
          )
      }
      <div onClick={handleOnclick} style={{minHeight:"fit-content"}}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/payment-terms' element={<PaymentTerms />} />
          <Route path='/forgot' element={<ResetPass />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/emailverify' element={<EmailVerify />} />
          <Route path='/admin-login' element={<AdminAuth />} />
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/single/:id" element={<SingleStr />} />
            <Route path="/singleHi/:id" element={<SingleHindiStr />} />
            <Route path="/singleUserStratigy/:id" element={<SingleUserStr />} />
            <Route path="/user-created-strategy" element={<CreatedStratigy />} />
            <Route path='/addForm' element={<AddForm />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/payment-info' element={<PaymentInformation />} />
            <Route
            path="/editStrategyform/:id/*"
            element={isPlanExpired ? <Navigate to="/subscription" />:<EditStrategy /> }
            />
            <Route
            path="/user-edited-strategy"
            element={isPlanExpired ? <Navigate to="/subscription" />:<EditedStratigy /> }
            />
            <Route
              path="/saveStratigy"
              element={isPlanExpired ? <Navigate to="/subscription" />:<SaveStratigy /> }
            />
              <Route
              path="/favouriteStratigy"
              element={isPlanExpired ? <Navigate to="/subscription" />:<FavouriteStr /> }
            />
                <Route
              path="/search"
              element={isPlanExpired ? <Navigate to="/subscription" />:<Stratigy /> }
            />
                <Route
              path="/profile/:id"
              element={isPlanExpired ? <Navigate to="/subscription" />:<OthersProfile /> }
            />
                <Route
              path="/profile/:id/favouriteStrategies"
              element={isPlanExpired ? <Navigate to="/subscription" />:<OtherFavouriteStrategies /> }
            />
                <Route
              path="/profile/:id/createdStrategies"
              element={isPlanExpired ? <Navigate to="/subscription" />:<OtherCreatedStratigies /> }
            />
            <Route
                path="/foundational-learning"
                element={isPlanExpired ? <Navigate to="/subscription" />:<FoundationalLearning /> }
            />
            <Route
              path="/resources"
              element={isPlanExpired ? <Navigate to="/subscription" />:<Resources /> }
            />
            
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
              <Route exact path='/approve-en' element={<ApproveEn />} />
              <Route exact path='/approve-hi' element={<ApproveHi />} />
              <Route exact path='/reqbyuser-en' element={<UserReqEn />} />
              <Route exact path='/reqbyuser-hi' element={<UserReqHi />} />
              <Route exact path='/admin-comments' element={<DashComments />} />
              <Route exact path='/browsers-devices' element={<DeviceList />} />
              <Route exact path='/user-details/:id' element={<UserDetails />} />
              <Route exact path='/add-resources' element={<AddResources />} />
              <Route exact path='/all-resources' element={<AllResources />} />
              <Route exact path='/email-template' element={<EmailTemplate />} />
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
          loc.pathname === '/super-upHi-str' ||
          loc.pathname === '/approve-en' ||
          loc.pathname === '/approve-hi' ||
          loc.pathname === '/reqbyuser-en' ||
          loc.pathname === '/reqbyuser-hi' ||
          loc.pathname === '/admin-comments' ||
          loc.pathname === '/add-resources' ||
          loc.pathname === '/all-resources' ||
          loc.pathname === '/email-template' ||
          loc.pathname === '/browsers-devices' ||
          loc.pathname === '/privacy-policy' ||
          loc.pathname === '/terms-conditions' ||
          loc.pathname === '/payment-terms' ||
          loc.pathname.includes('/user-details')
          ? ('') : (
            <Footer />
          )
      }
    </div>
  );
}

export default App;