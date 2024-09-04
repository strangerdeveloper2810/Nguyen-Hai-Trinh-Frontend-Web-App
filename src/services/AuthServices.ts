import _ from "lodash";
import http from "@/utils/setting";
import { User, UserLogin } from "@/types/user";
export const AuthService = {
  userLogin: async (values: UserLogin) => {
    const res = await http.post("/QuanLyNguoiDung/DangNhap", values);
    try {
      if (_.get(res, "status") === 200) {
        return _.get(res, "data");
      }
    } catch (error) {
      return error;
    }
  },
  userRegister: async (values: User) => {
    const res = await http.post("/QuanLyNguoiDung/DangKy", values);
    try {
      if (_.get(res, "status") === 200) {
        return _.get(res, "data");
      }
    } catch (error) {
      return error;
    }
  },
};
