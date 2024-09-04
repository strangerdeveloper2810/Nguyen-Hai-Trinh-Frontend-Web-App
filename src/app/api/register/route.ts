import _ from "lodash";
import { AuthService } from "@/services/AuthServices";
export async function POST(request: Request) {
  const res = await request.json();
  try {
    const responseRegister = await AuthService.userRegister(res);
    return Response.json({ data: { responseRegister } }, { status: 201 });
  } catch (error) {
    return Response.json({ data: error }, { status: 400 });
  }
}
