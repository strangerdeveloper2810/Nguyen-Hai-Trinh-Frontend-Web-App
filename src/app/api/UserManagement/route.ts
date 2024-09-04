import _ from "lodash";
import { UserManagementService } from "@/services/UserManagementServices";
export async function GET() {
  const res = await UserManagementService.getListUser();
  try {
    if (_.isEmpty(res)) {
      return Response.json({ data: [] });
    }
    return Response.json({ data: res }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
