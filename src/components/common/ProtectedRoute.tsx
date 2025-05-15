import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet?: JSX.Element;
}

export default function ProtectedRoute({
    isAuthenticated,
    authenticationPath,
    outlet,
}: ProtectedRouteProps) {
    if (isAuthenticated) {
        return outlet ? outlet : <Outlet />;
    } else {
        return <Navigate to={authenticationPath} replace />;
    }
}
