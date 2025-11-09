import {
  IOptions,
  IGender,
  ILogin,
  IAuthResponse,
  IVerifyEmailRequest,
  IPackageType,
  ISearchCard,
  ISearchCardsParams,
} from '../services/types/data';

const API_URL = process.env.REACT_APP_API_URL;

const withBaseUrl = (path: string) => {
  if (API_URL) {
    return `${API_URL.replace(/\/$/, '')}${path}`;
  }
  return path;
};

export const getGender = async (): Promise<Array<IGender>> => {
  return _request<Array<IGender>>(withBaseUrl('/Gender'), {
    method: 'GET',
  });
};

export const registerUser = async (data: ILogin): Promise<IAuthResponse> => {
  return _authrequest<IAuthResponse>(withBaseUrl('/api/Auth/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: ILogin): Promise<IAuthResponse> => {
  return _authrequest<IAuthResponse>(withBaseUrl('/api/Auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const verifyEmail = async (data: IVerifyEmailRequest): Promise<IAuthResponse> => {
  return _authrequest<IAuthResponse>(withBaseUrl('/api/Auth/verify-email'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getPackageTypes = async (): Promise<IPackageType[]> => {
  return _request<IPackageType[]>(withBaseUrl('/api/Cards/packages'), {
    method: 'GET',
  });
};

export const searchCards = async (params: ISearchCardsParams): Promise<ISearchCard[]> => {
  const searchParams = new URLSearchParams({
    cityFrom: params.cityFrom,
    cityTo: params.cityTo,
    arrivalFromUtc: params.arrivalFromUtc,
    arrivalToUtc: params.arrivalToUtc,
    typeId: params.typeId,
    packageId: params.packageId,
  });

  return _request<ISearchCard[]>(`${withBaseUrl('/api/Cards/search')}?${searchParams.toString()}`, {
    method: 'GET',
  });
};

export const getCardById = async (id: string): Promise<ISearchCard> => {
  return _request<ISearchCard>(withBaseUrl(`/api/Cards/${id}`), {
    method: 'GET',
  });
};

const _request = <T>(url: string, options?: IOptions): Promise<T> => {
  return fetch(url, options)
    .then((res) => _parseResponse<T>(res))
    .catch((err) => {
      console.error(err);
      throw new Error('Network error');
    });
};

const _authrequest = <T>(url: string, options?: IOptions): Promise<T> => {
  const requestOptions: RequestInit = {
    ...options,
    credentials: options?.credentials ?? 'include',
  };

  return fetch(url, requestOptions)
    .then((res) => _parseResponse<T>(res))
    .catch((err) => {
      console.error(err);
      throw new Error('Network error');
    });
};

const _parseResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get('Content-Type') ?? '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    const data = await res.json();
    if (!res.ok) {
      const message =
        typeof data === 'object' && data !== null && 'message' in data
          ? String((data as { message?: unknown }).message)
          : 'Request failed';
      throw new Error(message);
    }
    return data as T;
  }

  if (!res.ok) {
    const text = await res.text();
    const message = text || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return null as T;
};
