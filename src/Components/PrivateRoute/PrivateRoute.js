import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


export default function PrivateOutlet() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return isAuthenticated ? <Outlet /> : navigate('/')
};
