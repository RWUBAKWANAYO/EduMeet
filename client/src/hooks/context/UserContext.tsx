import { createContext, useEffect, useState } from "react";
import { IUser, IUserContext } from "./types";

export const UserContext = createContext<IUserContext>({
  user: null,
  token: null,
  saveUser: (_data: { user: IUser; token?: string }) => {},
  removeUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<IUser | null>(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const saveUser = (data: { user: IUser; token?: string }) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        saveUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
