//Se intento proteger la ruta de "confirmacion-compra" a través del middleware pero al final se resolvio seteando una
//cokkie con la libreria "js-cookie"

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const access = req.cookies.get("Access");
  const url = req.nextUrl.pathname;

  /* if (url.includes("confirmacion-compra") && !access) {
    return NextResponse.redirect(new URL("/", req.url));
  } */
}

export const config = {
  matcher: "/confirmacion-compra",
};
