import { createContext, useState } from "react";

export const UserContext = createContext({
  username: null,
  setUsername: () => {},
});

export function UserProvider({ children }) {
  const [userInfo, setuserInfo] = useState(null); // Initialize with null instead of an empty object

  return (
    <UserContext.Provider value={{ userInfo, setuserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
