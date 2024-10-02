/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUser } from "@/app/hooks/UseUserData";
import ProfilePage from "@/components/profilePage";
import { DATA_USER } from "@/types/api/endpoints";
import { UserType } from "@/types/user.type";
import axios from "axios";
import React from "react";

const Profile = () => {
  const { data, loading, error } = useUser();

  return data ? <ProfilePage userData={data} /> : <p>Loading...</p>;
};

export default Profile;
