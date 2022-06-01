import React, { useContext, useEffect } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [laoding, setLoading] = React.useState(false);

    const logout = () => {
        const confirmation = window.confirm('Are you sure you want to logout?');
        if (confirmation) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('jwt');
        };
    };

    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem('jwt');
        if (user) {
            setLoading(false)
            setIsAuthenticated(true);
            setUser(JSON.parse(user));
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout, laoding }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
