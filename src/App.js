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


function App() {
  axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          {/* <Route path='/forgot' element={<ResetPass />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/search" element={<SearchScrean />} />
          </Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
