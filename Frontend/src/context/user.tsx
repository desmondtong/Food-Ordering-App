import React from "react";

interface UserContextType {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  role: String;
  setRole: React.Dispatch<React.SetStateAction<String>>;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;
