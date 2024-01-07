import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value as string;
    if (!token) {
      throw new Error("Token cookie not found");
    }
    const decodedToken: any = jwt.verify(token, process.env.SECRET!);
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
