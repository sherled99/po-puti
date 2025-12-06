export interface IOptions {
  method: string;
  headers?: HeadersInit;
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

export interface ICardType {
  id: string;
  name: string;
}

export interface ICardStatus {
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

export interface IUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  sex?: boolean | null;
  city?: string;
  phone?: string;
  isApprovedPhone?: boolean;
  contactInfo?: string;
  rate?: number;
  image?: string | null;
}

export interface IResetPasswordRequest {
  token: string;
  email: string;
  newPassword: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  sex?: boolean | null;
  city?: string | null;
  phone?: string | null;
  isApprovedPhone?: boolean;
  contactInfo?: string | null;
  rate?: number | null;
  emailConfirmed?: boolean;
  createdAtUtc?: string;
  image?: string | null;
}

export interface ISearchCard {
  id: string;
  name: string;
  createdById: string;
  createdOnUtc: string;
  image?: string | null;
  createdByImage?: string | null;
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

export interface ICreateCardRequest {
  name: string;
  createdById: string;
  cityTo: string;
  cityFrom: string;
  timeArrivedUtc: string;
  description: string;
  typeId: string;
  statusId: string;
  packageId: string;
}

export interface IReview {
  id: string;
  reviewerId?: string;
  reviewerContact?: string;
  reviewerName?: string;
  revieweeId?: string;
  revieweeContact?: string;
  createdOnUtc: string;
  text: string;
  score: number;
}

export interface ICreateReviewRequest {
  revieweeId: string;
  score: number;
  text: string;
}
