import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
