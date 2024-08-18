import { IAuth } from "@/interface/auth";
import { IUser } from "@/interface/user";

export interface IOtp {
  otpMethod: string | null;
  email: string | null;
  message: string | null;
  expiresAt?: string | null;
}

type IPermission = {
  code: string;
  isFull: boolean;
  isRead: boolean;
  isWrite: boolean;
  isRemove: boolean;
};

export class Auth implements IAuth {
  username?: string | null;
  password?: string | null;
  accessToken: string | null;
  sessionScope: string | null;
  user: IUser | null;
  userId?: string | null;
  customerId?: string | null;
  otp: IOtp;
  permissions?: IPermission[];

  constructor({
    username,
    password,
    accessToken,
    sessionScope,
    user,
    userId,
    otp,
    permissions,
  }: IAuth) {
    this.username = username;
    this.password = password;
    this.accessToken = accessToken;
    this.sessionScope = sessionScope;
    this.user = user;
    this.userId = userId;
    this.otp = otp;
    this.permissions = permissions;
  }
}
