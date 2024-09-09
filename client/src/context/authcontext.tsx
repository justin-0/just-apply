import { userOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type Context = {
  user: {
    id: string;
    username: string;
  } | null;
};

const AuthContext = createContext<Context | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(
    null
  );
  const { data } = useQuery(userOptions());

  useEffect(() => {
    if (data) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
