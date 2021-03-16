import { useUser } from "./userContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingPage } from "../components/LoadingPage";

export function Unauthenticated(Component) {
  return function (props) {
    const { user, userLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!userLoading && user) router.push("/");
    }, [userLoading, user]);

    if (userLoading) return <LoadingPage />;

    return <Component {...arguments} {...props} />;
  };
}
