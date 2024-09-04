export interface User {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom?: string;
  maLoaiNguoiDung?: string;
  hoTen: string;
}

export interface UserLogin {
  taiKhoan: string;
  matKhau: string;
}
