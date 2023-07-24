import { ToastProps } from '../UI/Toast'

interface IRegisterUser {
  email: string
  username: string
  password: string
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export enum UserProvider {
  Local = 'local',
  Google = 'google',
}

interface IUser {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  role: UserRole
  isVerified: boolean
  provider: UserProvider
  profilePicture: string
  coverPicture: string
}

interface IApiResponse {
  success: boolean
  message: string
}

interface IUserResponse extends IApiResponse {
  user: IUser
}

interface ILoginUser {
  identifier: string
  password: string
}

interface INewPassword {
  password: string
  confirmPassword: string
}

interface INewPasswordPayload extends INewPassword {
  token: string
}

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

interface IToastContext {
  toasts: ToastProps[]
  addToast: (toast: ToastProps) => void
  removeToast: (id: string) => void
  addErrorToast: (message: string, timeout?: number) => void
  addSuccessToast: (message: string, timeout?: number) => void
}

export type {
  IRegisterUser,
  IToastContext,
  ILoginUser,
  IUser,
  IUserResponse,
  INewPassword,
  INewPasswordPayload,
  IApiResponse,
}
