import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


export default function PrivateAdminOutlet() {
    const { isAuthenticatedAdmin } = useAuth();
    const navigate = useNavigate();

    return isAuthenticatedAdmin ? <Outlet /> : navigate('/admin-login')
};
