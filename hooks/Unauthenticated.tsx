import { useUser } from "./userContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingPage } from '../components/LoadingPage';

export function Authenticated(Component) {
  return function (props) {
    const { user, userLoading } = useUser();
    const router = useRouter();
    useEffect(() => {
      if (!userLoading && !user) router.push("/signin");
    }, [userLoading, user]);

    if (!user) return <LoadingPage />;

    return (
      <Component
        {...arguments}
        {...props}
        userLoading={userLoading}
      />
    );
  };
}
