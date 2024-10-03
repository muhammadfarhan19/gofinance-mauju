import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { PostAuthLoginReq } from "@/types/auth.type";
import axios from "axios";
import { AUTH_API } from "@/types/api/endpoints";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../shared/Snackbar";
import { SnackbarType } from "@/reducer/CommonReducer";
import { PasswordIcon, UserIcon } from "../icons";
import Link from "next/link";

const Login = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (Cookies.get("token")) push("/");
  }, [push]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostAuthLoginReq>();

  const onSubmit = async (val: PostAuthLoginReq) => {
    try {
      const response = await axios.post(AUTH_API.POST_LOGIN, val);

      const accessToken = response.data.token;
      Cookies.set("token", accessToken);
      localStorage.setItem("username", val.username);

      dispatch(
        setSnackbar({
          show: true,
          message: "Berhasil Login",
          type: SnackbarType.INFO,
        }),
      );
      push("/");
      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to login. Please try again.";
      dispatch(
        setSnackbar({
          show: true,
          message: errorMessage,
          type: SnackbarType.ERROR,
        }),
      );
    }
  };

  return (
    <>
      <h1 className="font-bold text-[#333333] text-2xl">Hello Again!</h1>
      <h1 className="text-[#333333]">Welcome Back</h1>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="relative block">
            <div className="absolute inset-y-0 left-2 flex items-center pl-2">
              <UserIcon />
            </div>
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
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-full"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 text-sm hover:underline"
        >
          Forgot Password
        </Link>
      </div>

      <div className="text-center flex items-center justify-center gap-x-1">
        <h1 className="text-[#333333] text-sm">Dont have an account?</h1>
        <Link
          href="/auth/register"
          className="text-blue-600 text-sm hover:underline"
        >
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
