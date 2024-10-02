/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { EmailIcon, PasswordIcon, UserIcon } from "../icons";
import { useForm } from "react-hook-form";
import { UserType } from "@/types/user.type";
import axios from "axios";
import { AUTH_API } from "@/types/api/endpoints";

const Register = () => {
  const { push } = useRouter();
  React.useEffect(() => {
    if (Cookies.get("token")) push("/");
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (val: UserType) => {
    try {
      const payload = {
        ...val,
        name: {
          firstname: "Depan",
          lastname: "Belakang",
        },
        address: {
          city: "Bantul",
          street: "Jl. Parangtritis",
          number: 3,
          zipcode: "56264",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: "085156219612",
      };
      const response = await axios.post(AUTH_API.POST_REGISTER, payload);
      console.log(response);

      alert(`Berhasil Mendaftar. ID anda ${response.data.id}`);
      push("/auth/login");

      // return response;
      // dispatch(
      //   setSnackbar({
      //     show: true,
      //     message: "Berhasil Login",
      //     type: SnackbarType.INFO,
      //   })
      // );
    } catch (error: any) {
      alert("Gagal Mendaftar");
      // dispatch(
      //   setSnackbar({
      //     show: true,
      //     message: "Email atau Kata Sandi Salah!!",
      //     type: SnackbarType.ERROR,
      //   })
      // );
    }
  };

  return (
    <>
      <h1 className="font-bold text-[#333333] text-2xl">Hello</h1>
      <h1 className="text-[#333333]">Sign Up To Get Started</h1>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="relative block">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-12 py-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
              {...register("username", { required: "Username is required" })}
            />
          </label>
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="relative block">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <EmailIcon />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-12 py-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
              {...register("email", { required: "Email is required" })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="relative block">
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <PasswordIcon />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-12 py-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
              {...register("password", { required: "Password is required" })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-2">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-full">
            Register
          </button>
        </div>
      </form>

      <div className="text-center flex items-center justify-center gap-x-1">
        <h1 className="text-[#333333] text-sm">Already have an account? </h1>
        <a href="/auth/login" className="text-blue-600 text-sm hover:underline">
          Login
        </a>
      </div>
    </>
  );
};

export default Register;
