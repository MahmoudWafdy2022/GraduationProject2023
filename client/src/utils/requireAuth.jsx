import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const requireAuth = (Component) => {
  const AuthWrapper = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state?.auth?.userInfo);

    useEffect(() => {
      // Redirect to the home page if the user is already logged in
      if (isAuthenticated?.token) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    // Render the component if the user is not logged in
    return <Component {...props} />;
  };

  // Set display name for the HOC
  AuthWrapper.displayName = `RequireAuth(${getDisplayName(Component)})`;

  return AuthWrapper;
};

// Helper function to get the display name of a component
const getDisplayName = (Component) => {
  return Component.displayName || Component.name || "Component";
};

export default requireAuth;
