import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoute {
  user: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ user }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
