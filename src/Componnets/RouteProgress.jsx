import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../nprogress-custom.css";

NProgress.configure({
  showSpinner: false,
  trickle: false,
});

const RouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return null;
};

export default RouteProgress;
