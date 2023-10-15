import { useEffect } from "react";
import { useUser } from "../Contexts/UserContext";

const LogOut = () => {
  const { resetUser } = useUser();

  const logout = () => {
    resetUser();
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  useEffect(() => logout(), []);

  return <div></div>;
};

export default LogOut;
