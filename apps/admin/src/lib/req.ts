import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function getServerRequest(url: string) {
  const cStore = cookies();
  const cookees = cStore.getAll();

  const req = new NextRequest(url);

  cookees.forEach((cookie) => {
    req.cookies.set(cookie.name, cookie.value);
  });

  return req;
}
