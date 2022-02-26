import Cookies from "universal-cookie";

const clearCookie = () => {
  removeCookie("ctoken");
};

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

  window.addEventListener("beforeunload", clearCookie);
}

export function removeCookie(cookieName: string) {
  const domain = new URL(window.location.href).hostname;
  new Cookies().remove(cookieName, { domain: domain, path: "/" });
  window.removeEventListener("beforeunload", clearCookie, true);
}

export function accessCookie(cookieName: string) {
  return new Cookies().get(cookieName);
}
