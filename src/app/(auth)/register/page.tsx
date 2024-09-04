"use client";
import _ from "lodash";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { useAppContext } from "@/app/context/AppProvider";
import { httpForNextServer } from "@/utils/setting";
import { User } from "@/types/user";
import validationSchema from "./validation";

const Register: React.FC = () => {
  const { accessToken } = useAppContext();
  const router = useRouter();
  if (accessToken) {
    router.push("/");
  }
  const handleSubmitRegister = async (values: User) => {
    const res = await httpForNextServer.post("/api/register", values);
    try {
      if (_.get(res, "status") === 201) {
        alert("Register successfully");
        router.push("/login");
      } else {
        alert("Register fail");
      }
    } catch (error) {
      alert("Register fail");
      console.log(error);
    }
  };

  const formikBag = useFormik<User>({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmitRegister,
  });

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    formikBag;
  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Register
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              name="hoTen"
              value={_.get(values, "hoTen", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.hoTen && errors.hoTen && (
              <div className="text-red-600 mt-2">{errors.hoTen}</div>
            )}
          </div>
        </div>

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
              value={_.get(values, "matKhau", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.matKhau && errors.matKhau && (
              <div className="text-red-600 mt-2">{errors.matKhau}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="text"
              name="email"
              value={_.get(values, "email", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.email && errors.email && (
              <div className="text-red-600 mt-2">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="soDt"
              value={_.get(values, "soDt", "")}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {touched.soDt && errors.soDt && (
              <div className="text-red-600 mt-2">{errors.soDt}</div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Register
            </span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p>
            Already have an account?
            <Link href="/login" className="ml-3 text-primary">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
