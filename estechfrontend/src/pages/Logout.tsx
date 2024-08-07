import { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import useAuthStore from "@stores/authStore";

const Logout = () => {
    const logout = useAuthStore((state) => state.logout);
    useEffect(() => {
        logout();
    }, []);
    return  <Navigate to="/login" />;
};

export default Logout;
