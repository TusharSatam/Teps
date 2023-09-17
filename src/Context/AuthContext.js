import React, { useContext, useEffect, useState } from 'react';
import { getAllStratigys, getComment } from '../services/stratigyes';
import { getUserStratigys } from '../services/userStratigy';
import { getAllHindiStratigys } from '../services/hindiStratigys';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [admin, setAdmin] = React.useState(null);
  const [laoding, setLoading] = React.useState(false);
  const [stratigyFilData, setStratigyFilData] = React.useState([]);
  const [stratigyFilUserData, setStratigyFilUserData] = React.useState([]);
  const [selectLang, setselectLang] = React.useState('')
  const [humBurgs, setHumBurgs] = React.useState(true)

  const [allStrategies, setAllStrategies] = useState([]);
  const [allUserStrategies, setAllUserStrategies] = useState([]);
  const [allHindiStrategies, setAllHindiStrategies] = useState([]);
  const [loadingdropdown, setLoadingdropdown] = useState(false);

// Fetch and cache data
useEffect(() => {
  const fetchDataEN = async () => {
    setLoadingdropdown(true)
    try {
      // Check if the data is already cached
      if (allStrategies.length === 0 || allUserStrategies.length === 0) {
        const allStrategiesResponse = await getAllStratigys();
        const userStrategiesResponse = await getUserStratigys();

        setAllStrategies(allStrategiesResponse.data);
        setAllUserStrategies(userStrategiesResponse.data?.filter(res => res.Approve === true));
      }
      setLoadingdropdown(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchDataEN();
}, [allStrategies, allUserStrategies]);
// Fetch and cache data (hindi)
useEffect(() => {
  const fetchDataHindi = async () => {
    setLoadingdropdown(true);
    try {
      // Fetch Hindi strategies and store in allHindiStrategies
      const allHindiStrategiesResponse = await getAllHindiStratigys();
      setAllHindiStrategies(allHindiStrategiesResponse.data);
      setLoadingdropdown(false);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  fetchDataHindi();
}, []);

  const logout = () => {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('data');
      localStorage.removeItem('jwt');
      localStorage.removeItem('filterData');
      localStorage.removeItem('filterDataH');
      localStorage.removeItem('selectedDropdown');
      localStorage.removeItem('selectedHiDropdown');
    };
  };

  const Adminlogout = () => {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      setIsAuthenticatedAdmin(false);
      setAdmin(null);
      localStorage.removeItem('adminJwt');
      localStorage.removeItem('adminData');
    };
  };

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('jwt');
    if (token) {
      setLoading(false)
      setIsAuthenticated(true);
    }
    const data = localStorage.getItem('data');
    if (data) {
      setUser(JSON.parse(data))
      setIsAuthenticated(true);
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('adminJwt');
    if (token) {
      setLoading(false)
      setIsAuthenticatedAdmin(true);
    }
    const data = localStorage.getItem('adminData');
    if (data) {
      setAdmin(JSON.parse(data))
      setIsAuthenticatedAdmin(true);
    }
  }, []);

  React.useEffect(() => {
    const data = localStorage.getItem('filterData');
    const dataH = localStorage.getItem('filterDataH');
    const userData = localStorage.getItem('filterUserData');
    setLoading(true);
    if (data) {
      setStratigyFilData(JSON.parse(data))
    }
    if (dataH) {
      setStratigyFilData(JSON.parse(dataH))
    }
    if (userData) {
      setStratigyFilUserData(JSON.parse(userData))
    }
  }, []);


  React.useEffect(() => {
    const language = localStorage.getItem('i18nextLng');
    if (language) {
      if (language === 'hi') {
        setselectLang('hindi')
      } else {
        setselectLang('english')
      }
    }
  }, [selectLang])
  const [comments, setComments] = useState([])
  useEffect(() => {
    getComment()
      .then(res => {
        setComments(res?.data?.filter(res => res?.Approve === false))
      })
  }, [])
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, user, setIsAuthenticated, setUser, logout, laoding, stratigyFilData,
        setStratigyFilData, selectLang, setselectLang, isAuthenticatedAdmin, setIsAuthenticatedAdmin,
        admin, Adminlogout, setAdmin, humBurgs, setHumBurgs, stratigyFilUserData, setStratigyFilUserData, setComments, comments, allStrategies,
        allUserStrategies,allHindiStrategies,
        loadingdropdown,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
