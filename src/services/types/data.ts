export interface IOptions {
  method: string;
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Headers"?: string;
  };
  body?: string;
  credentials?: RequestCredentials;
}

export interface IAuthResponse {
  email: string;
  emailConfirmed: boolean;
  token: string | null;
}

export interface IPackageType {
  id: string;
  name: string;
}

export interface IVerifyEmailRequest {
  email: string;
  code: string;
}

export interface ICustomResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface IGender {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  secondName: string;
  passwordHash: string;
  gender: IGender;
  city: string;
  email: string;
  phone: string;
  isApprovedPhone: boolean;
  contactInfo: string;
  rateUser: number;
}

export interface ISearchCard {
  id: string;
  name: string;
  createdById: string;
  createdOnUtc: string;
  cityTo: string;
  cityFrom: string;
  timeArrivedUtc: string;
  description: string;
  typeId: string;
  typeName: string;
  statusId: string;
  statusName: string;
  packageId: string;
  packageName: string;
}

export interface ISearchCardsParams {
  cityFrom: string;
  cityTo: string;
  arrivalFromUtc: string;
  arrivalToUtc: string;
  typeId: string;
  packageId: string;
}
