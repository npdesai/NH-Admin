import { accessCookie, cookieName, setCookie } from "./cookie";

const getExpireDate = () => {
  const now = new Date();
  return new Date(now.setMinutes(now.getMinutes() + Number(process.env.REACT_APP_TOKEN_EXPIRY_MINUTE)));
};

export function saveToken(token: string) {
  const expireDate = getExpireDate();
  setCookie(cookieName, token, expireDate);
}

export function getToken() {
  return accessCookie(cookieName);
}

export type TokenDecoded = {
  aud: string;
  exp: number;
  iss: string;
};
