export interface UserInfo {
  loginId: string;
  userName: string;
  provider: "JWT";
  role: string;
}

export interface UserInfoWithToken extends UserInfo {
  accessToken: string;
}
