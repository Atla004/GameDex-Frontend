
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string | null;
  _id: string | null;
  email: string | null;
  token: string | null;
}

const userDataContext = createContext<{
  username: string | null;
  _id: string | null;
  email: string | null;
  token: string | null;
  setUser: (user: User) => void;
}>({
  username: null,
  _id: null,
  email: null,
  token: null,
  setUser: () => {},
});

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User>({
    username: "",
    _id: "",
    email: "",
    token: "",
  });

  const setUser = ({ username, _id, email, token }: User) => {
    setUserData({ username, _id, email, token });
  };

  useEffect(() => {
    console.log("userData se cambio", userData);
  }, [userData]);

  return (
    <userDataContext.Provider value={{ ...userData, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export function useUserData() {
  const context = useContext(userDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a userDataContextProvider');
  }
  return context;
}