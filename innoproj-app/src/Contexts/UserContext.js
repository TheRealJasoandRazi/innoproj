import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData")) || {
      id: 0, // Integer
      username: "", // String
      walletAddress: "", // String
      isLoggedIn: false, // Boolean
    };
    return savedUser;
  });

  const setUser = (data) => {
    setUserData({
      id: parseInt(data.id),
      username: String(data.username),
      walletAddress: String(data.walletAddress),
      isLoggedIn: data.isLoggedIn,
    });
  };

  const resetUser = () => {
    setUserData({
      id: 0, // Integer
      username: "", // String
      walletAddress: "", // String
      isLoggedIn: false, // Boolean
    });
  };

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
