import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth.Context";
import { useProject } from "../context/project/useProject.Context";
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const { getProjects, firstCharge } = useProject();
  if (!isAuthenticated) return <Navigate to="/login" replace></Navigate>;
  if (firstCharge) getProjects();
  return <Outlet />;
}

export default ProtectedRoute;
