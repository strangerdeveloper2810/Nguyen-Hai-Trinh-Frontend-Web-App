import _ from "lodash";
import http from "@/utils/setting";
import { User } from "@/types/user";

export const UserManagementService = {
  getListUser: async () => {
    const res = await http.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=20",
    );

    try {
      if (_.get(res, "data.statusCode", 404) === 200) {
        return _.get(res, "data.content", []);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  },
};
