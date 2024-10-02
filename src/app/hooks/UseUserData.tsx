"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "@/types/user.type";
import { DATA_USER } from "@/types/api/endpoints";

interface UserContextType {
  data: UserType | undefined;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("username");
        const { data } = await axios.get(DATA_USER.GET_USER_LIST);
        const user = data.find((user: UserType) => user.username === username);
        setData(user);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ data, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
