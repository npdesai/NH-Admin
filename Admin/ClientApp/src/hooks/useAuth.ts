import { accessCookie } from "../common/cookie";

export const useAuth = () => {
  let isLogin = false;
  const cookieValue = accessCookie("ctoken");
  if (cookieValue) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return isLogin;
};
