"use client";

import React, { useEffect } from "react";
import { AvatarIcon } from "../icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserType } from "@/types/user.type";
import { useUser } from "@/app/hooks/UseUserData";

interface ProfilePageProps {
  userData: UserType | undefined;
}

const ProfilePage = ({ userData }: ProfilePageProps) => {
  const { push } = useRouter();
  const username = localStorage.getItem("username") || userData?.username;
  const { data, loading, error } = useUser();

  useEffect(() => {
    if (!Cookies.get("token")) push("/auth/login");
  }, [push]);

  return (
    <section className="min-w-full max-w-screen-md m-auto border min-h-fit grid grid-cols-1 md:grid-cols-2 max-h-screen md:max-h-[500px] bg-[#0575E6] rounded-xl py-10 px-2 md:px-4">
      <aside className="w-full col">
        <AvatarIcon />
      </aside>
      <aside className="w-full col">
        <h1>{username}</h1>
        <h1>{data?.email}</h1>
        <p>Phone: {data?.phone}</p>
        <p>
          Address: {data?.address.street}, {data?.address.city},{" "}
          {data?.address.zipcode}
        </p>
        <p>
          Geolocation: {data?.address.geolocation.lat},{" "}
          {data?.address.geolocation.long}
        </p>
      </aside>
    </section>
  );
};

export default ProfilePage;
