import _ from "lodash";
import { cookies } from "next/headers";
import { AuthService } from "@/services/AuthServices";
import { ACCESS_TOKEN, ROLE } from "@/utils/setting";
export async function POST(request: Request) {
  const res = await request.json();
  const cookie = cookies();
  try {
    const responseLogin = await AuthService.userLogin(res);

    const accessToken = _.get(responseLogin, "content.accessToken");
    const role = _.get(responseLogin, "content.maLoaiNguoiDung", "");
    cookie.set(ACCESS_TOKEN, accessToken, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    });

    cookie.set(ROLE, role, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    });
    return Response.json(
      { message: "Login Successfully", accessToken, role },
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=${accessToken}`,
        },
      }
    );
  } catch (error) {
    return Response.json({ data: error }, { status: 400 });
  }
}
