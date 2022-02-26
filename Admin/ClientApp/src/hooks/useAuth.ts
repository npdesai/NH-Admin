import { accessCookie, cookieName } from "../common/cookie";

export const useAuth = () => {
  let isLogin = false;
  const cookieValue = accessCookie(cookieName);
  if (cookieValue) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return isLogin;
};
