import React, { useContext } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [laoding, setLoading] = React.useState(false);
    const [stratigyFilData, setStratigyFilData] = React.useState([]);
    const logout = () => {
        const confirmation = window.confirm('Are you sure you want to logout?');
        if (confirmation) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('jwt');
            localStorage.removeItem('data');
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
        const data = localStorage.getItem('filterData');
        setLoading(true);
        if (data) {
            setStratigyFilData(JSON.parse(data))
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout, laoding, stratigyFilData, setStratigyFilData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
