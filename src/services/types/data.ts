export interface IOptions {
  method: string;
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Headers"?: string;
  };
  body?: string;
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