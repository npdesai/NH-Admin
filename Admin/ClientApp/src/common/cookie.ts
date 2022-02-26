import Cookies from "universal-cookie";

export const cookieName = "ctoken";

export function setCookie(
  cookieName: string,
  cookieValue: string,
  expireDate: Date
) {
  const domain = new URL(window.location.href).hostname;
  new Cookies().set(cookieName, cookieValue, {
    domain: domain,
    path: "/",
    expires: expireDate,
  });
}

export function removeCookie(cookieName: string) {
  const domain = new URL(window.location.href).hostname;
  new Cookies().remove(cookieName, { domain: domain, path: "/" });
}

export function accessCookie(cookieName: string) {
  return new Cookies().get(cookieName);
}
