import { accessCookie, setCookie } from "./cookie";

const getExpireDate = () => {
  const now = new Date();
  return new Date(now.setMinutes(now.getMinutes() + Number(process.env.REACT_APP_TOKEN_EXPIRY_MINUTE)));
};

export function saveToken(token: string) {
  const expireDate = getExpireDate();
  setCookie("ctoken", token, expireDate);
}

export function getToken() {
  return accessCookie("ctoken");
}

export type TokenDecoded = {
  aud: string;
  exp: number;
  iss: string;
};
