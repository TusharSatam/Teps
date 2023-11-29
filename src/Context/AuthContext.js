import React, { useContext, useEffect, useState } from "react";
import { getAllStratigys, getComment } from "../services/stratigyes";
import { getUserStratigys } from "../services/userStratigy";
import { getAllHindiStratigys } from "../services/hindiStratigys";
import { formatExpiryDate } from "../utils/utils";
import { getUserData } from "../services/auth";
import { useNavigate } from "react-router-dom";

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
  const [selectLang, setselectLang] = React.useState("");
  const [humBurgs, setHumBurgs] = React.useState(true);
  const [strategyNum, setstrategyNum] = React.useState("");
  const [allStrategies, setAllStrategies] = useState([]);
  const [allUserStrategies, setAllUserStrategies] = useState([]);
  const [allHindiStrategies, setAllHindiStrategies] = useState([]);
  const [loadingdropdown, setLoadingdropdown] = useState(false);
  const [editStrategyFormData, seteditStrategyFormData] = useState([]);
  const [showStrategyCheckboxes, setShowStrategyCheckboxes] = useState(false);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [checkBoxesH, setCheckBoxesH] = useState([]);
  const [ownCheckBox, setOwnCheckBox] = useState(false);
  const [selectedResource, setselectedResource] = useState("");
  const [selectedPaymentCard, setselectedPaymentCard] = useState({});
  const [isPlanExpired, setisPlanExpired] = useState(false);
  useEffect(() => {
    if (
      !new Date(formatExpiryDate(user?.expiry)) < new Date() ||
      user?.expiry
    ) {
      setisPlanExpired(false);
    } else {
      setisPlanExpired(true);
    }
  }, [user]);

  // Fetch and cache data
  useEffect(() => {
    const fetchDataEN = async () => {
      setLoadingdropdown(true);
      try {
        // Check if the data is already cached
        if (allStrategies.length === 0 || allUserStrategies.length === 0) {
          const allStrategiesResponse = await getAllStratigys();
          let userStrategiesResponse = await getUserStratigys();
          userStrategiesResponse = userStrategiesResponse?.data?.filter(
            (res) => res.Approve === true && res.isPublic === true
          );

          setAllStrategies(allStrategiesResponse.data);
          setAllUserStrategies(userStrategiesResponse);
        }
        setLoadingdropdown(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataEN();
  }, []);
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
        console.error("Error fetching data:", error);
      }
    };

    fetchDataHindi();
  }, []);

  const logout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.clear();
    }
  };

  const Adminlogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      setIsAuthenticatedAdmin(false);
      setAdmin(null);
      localStorage.removeItem("adminJwt");
      localStorage.removeItem("adminData");
    }
  };

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoading(false);
      setIsAuthenticated(true);
      getUserData(JSON.parse(localStorage.getItem("jwt"))).then((res) => {
        if (res?.user_data) {
          setUser(res?.user_data);
        }
      });
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("adminJwt");
    if (token) {
      setLoading(false);
      setIsAuthenticatedAdmin(true);
    }
    const data = localStorage.getItem("adminData");
    if (data) {
      setAdmin(JSON.parse(data));
      setIsAuthenticatedAdmin(true);
    }
  }, []);

  React.useEffect(() => {
    const data = localStorage.getItem("filterData");
    const dataH = localStorage.getItem("filterDataH");
    const userData = localStorage.getItem("filterUserData");
    setLoading(true);
    if (data) {
      setStratigyFilData(JSON.parse(data));
    }
    if (dataH) {
      setStratigyFilData(JSON.parse(dataH));
    }
    if (userData) {
      setStratigyFilUserData(JSON.parse(userData));
    }
  }, []);

  React.useEffect(() => {
    const language = localStorage.getItem("i18nextLng");
    if (language) {
      if (language === "hi") {
        setselectLang("hindi");
      } else {
        setselectLang("english");
      }
    }
  }, [selectLang]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComment().then((res) => {
      setComments(res?.data?.filter((res) => res?.Approve === false));
    });
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        !window?.location?.pathname?.includes("/single") &&
        !window?.location?.pathname?.includes("/singleUserStratigy") &&
        !window?.location?.pathname?.includes("/search") &&
        !window?.location?.pathname?.includes("/singleHi")
      ) {
        // console.log({windowPath:true})
        setShowStrategyCheckboxes(false);
        setCheckBoxes([]);
        setCheckBoxesH([]);
      }
    }, 1000); // Run every 1000 milliseconds (1 second)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        logout,
        laoding,
        stratigyFilData,
        setStratigyFilData,
        selectLang,
        setselectLang,
        isAuthenticatedAdmin,
        setIsAuthenticatedAdmin,
        admin,
        Adminlogout,
        setAdmin,
        humBurgs,
        setHumBurgs,
        stratigyFilUserData,
        setStratigyFilUserData,
        setComments,
        comments,
        allStrategies,
        allUserStrategies,
        allHindiStrategies,
        seteditStrategyFormData,
        editStrategyFormData,
        loadingdropdown,
        strategyNum,
        setstrategyNum,
        showStrategyCheckboxes,
        setShowStrategyCheckboxes,
        checkBoxes,
        setCheckBoxes,
        checkBoxesH,
        setCheckBoxesH,
        ownCheckBox,
        setOwnCheckBox,
        setselectedPaymentCard,
        selectedPaymentCard,
        setselectedResource,
        selectedResource,
        isPlanExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
