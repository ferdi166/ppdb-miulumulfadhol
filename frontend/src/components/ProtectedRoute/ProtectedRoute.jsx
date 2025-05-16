import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/user.service';

const ProtectedRoute = ({ children, allowedGroups }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const user = getCurrentUser();
        // Cek apakah user ada dan termasuk dalam grup yang diizinkan
        const isAuthenticated = user && allowedGroups.includes(user.grup_user.id_grup_user);
        setAuthenticated(isAuthenticated);
        setLoading(false);
    }, [allowedGroups]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!authenticated) {
        // Redirect ke login dengan menyimpan intended URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
