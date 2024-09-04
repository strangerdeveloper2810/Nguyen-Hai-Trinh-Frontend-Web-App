"use client";
import _ from "lodash";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { useAppContext } from "@/app/context/AppProvider";
import { httpForNextServer } from "@/utils/setting";
import { UserLogin } from "@/types/user";
import validationSchema from "./validation";

const Login: React.FC = () => {
  const { accessToken } = useAppContext();
  const router = useRouter();
  if (accessToken) {
    router.push("/");
  }
  const handleSubmitLogin = async (values: UserLogin) => {
    const res = await httpForNextServer.post("/api/login", values);
    try {
      if (_.get(res, "status") === 200) {
        alert(_.get(res, "data.message"));
        router.push("/");
      } else {
        alert("Login fail");
      }
    } catch (error) {
      alert("Login fail");
      console.log(error);
    }
  };
  const formikBag = useFormik<UserLogin>({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmitLogin,
  });

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    formikBag;
  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-slate-600 sm:text-title-xl2">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            UserName
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your user name"
              name="taiKhoan"
              value={_.get(values, "taiKhoan", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.taiKhoan && errors.taiKhoan && (
              <div className="text-red-600 mt-2">{errors.taiKhoan}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="matKhau"
              placeholder="Enter your password"
              value={_.get(values, "matKhau", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.matKhau && errors.matKhau && (
              <div className="text-red-600 mt-2">{errors.matKhau}</div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p>
            You don&apos;t have an account?
            <Link href="/register" className="ml-3 text-primary">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
