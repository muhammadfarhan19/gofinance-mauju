/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { withReduxPage } from "@/app/hooks/ReduxPage";
import { useUser } from "@/app/hooks/UseUserData";
import ProfilePage from "@/components/profilePage";
import React from "react";

const Profile = () => {
  const { data, loading, error } = useUser();

  return data ? <ProfilePage userData={data} /> : <p>Loading...</p>;
};

export default withReduxPage()(Profile);
