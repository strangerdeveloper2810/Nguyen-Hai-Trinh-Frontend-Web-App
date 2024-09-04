"use client";
import _ from "lodash";
import React, { useState } from "react";
import { User } from "@/types/user";
import { useAppContext } from "@/app/context/AppProvider";
import Button from "@mui/material/Button";
import Modal from "../Modal";
import http from "@/utils/setting";
interface TablesProps {
  listUsers: User[];
}

const Tables: React.FC<TablesProps> = ({ listUsers = [] }) => {
  const { accessToken, role } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteUser = async (taiKhoan: string) => {
    try {
      const res = await http.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${encodeURIComponent(taiKhoan)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (_.get(res, "status") === 200) {
        alert("Xoá người dùng thành công");
        window.location.reload();
      } else {
        alert("Error deleting user");
      }
    } catch (error) {
      alert(_.get(error, "response.data.content"));
    }
  };

  const renderTableContent = () => {
    return _.map(listUsers, (user) => (
      <tr
        key={_.get(user, "taiKhoan", "")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
      >
        <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-900">
          {_.get(user, "taiKhoan", "")}
        </td>
        <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-900">
          {_.get(user, "hoTen", "")}
        </td>
        <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-900">
          {_.get(user, "email", "")}
        </td>
        <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-900">
          {_.get(user, "soDt", "")}
        </td>
        <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-900">
          {_.get(user, "maLoaiNguoiDung", "")}
        </td>
        {accessToken && role === "QuanTri" ? (
          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button className="hover:text-blue-700">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                    fill=""
                  />
                  <path
                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                    fill=""
                  />
                </svg>
              </button>
              <button
                className="hover:text-red-700"
                onClick={() => handleDeleteUser(_.get(user, "taiKhoan"))}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                    fill=""
                  />
                  <path
                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.42192 9.36602 9.11255 9.00039 9.11255Z"
                    fill=""
                  />
                  <path
                    d="M6.76285 9.83434C6.73235 9.45934 6.40947 9.16559 6.03135 9.19609C5.68135 9.22659 5.3876 9.54947 5.4181 9.92759L5.70035 13.4871C5.73085 13.8621 6.05373 14.1558 6.43185 14.1253C6.78185 14.0948 7.0756 13.7719 7.0451 13.3938L6.76285 9.83434Z"
                    fill=""
                  />
                  <path
                    d="M11.966 9.19609C11.5879 9.16559 11.2931 9.45934 11.2626 9.83434L10.9804 13.3938C10.9499 13.7719 11.2436 14.0948 11.5936 14.1253C11.9717 14.1558 12.2946 13.8621 12.3251 13.4871L12.6073 9.92759C12.6378 9.54947 12.3441 9.22659 11.966 9.19609Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>
          </td>
        ) : (
          <></>
        )}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <Button
        variant="outlined"
        onClick={handleClickOpenModal}
        sx={{
          marginBottom: "10px",
        }}
      >
        Add User
      </Button>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              User Name
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Full Name
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Email
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Phone Number
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Role
            </th>
            {accessToken && role === "QuanTri" ? (
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
      {openModal && (
        <Modal openModal={openModal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default Tables;
