import { type MouseEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigateToPreviousContext, type BackNavigationState } from "@/lib/navigation";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationState = location.state as BackNavigationState | null;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    navigateToPreviousContext(navigate, navigationState);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" onClick={handleBack} className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
