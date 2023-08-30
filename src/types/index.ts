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
  userSettings: IUserSettings
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
  callbackUrl?: string
}

interface INewPassword {
  password: string
  confirmPassword: string
}

interface INewPasswordPayload extends INewPassword {
  token: string
}

interface IToastOptions {
  timeout?: number
  group?: string
  message: string
  unique?: boolean
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
  addErrorToast: (options: IToastOptions) => void
  addSuccessToast: (options: IToastOptions) => void
}

interface IProfilePictureResponse extends IApiResponse {
  profilePicture: string
}

interface ICoverPictureResponse extends IApiResponse {
  coverPicture: string
}

interface IUserSettings {
  theme: 'light' | 'dark'
  language: 'en' | 'pl'
  createdAt: Date
  updatedAt: Date
  _id: string
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
  IToastOptions,
  IProfilePictureResponse,
  IUserSettings,
  ICoverPictureResponse,
}
