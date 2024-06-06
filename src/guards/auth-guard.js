import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { useAuth } from "src/hooks/use-auth";

const FREE_PATHS = ["/account", "/auth/login", "/auth/register", "/mileage-forms"];

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const pathname = usePathname();

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  const needSubscribed = useMemo(() => {
    return !user?.subscriptions || user?.subscriptions?.length < 1;
  }, [user]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!FREE_PATHS.includes(pathname)) {
      if (needSubscribed) router.replace("/pricing");
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/login",
          query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [user, pathname, router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
