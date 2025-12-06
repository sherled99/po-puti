import {
  IOptions,
  IGender,
  ILogin,
  IAuthResponse,
  IVerifyEmailRequest,
  IPackageType,
  ISearchCard,
  ISearchCardsParams,
  IResetPasswordRequest,
  IUpdateUserRequest,
  IUser,
  ICardType,
  ICardStatus,
  ICreateCardRequest,
} from '../services/types/data';

const API_URL = process.env.REACT_APP_API_URL;
const COUNTRIES_NOW_CITIES_URL = 'https://countriesnow.space/api/v0.1/countries/cities';
export const COUNTRIES_NOW_SUPPORTED_COUNTRIES = ['Russia', 'Serbia', 'Georgia', 'Kazakhstan'] as const;

const withBaseUrl = (path: string) => {
  if (API_URL) {
    return `${API_URL.replace(/\/$/, '')}${path}`;
  }
  return path;
};

let cachedCountriesNowCities: string[] | null = null;
let countriesNowCitiesPromise: Promise<string[]> | null = null;

export const getCountriesNowCities = async (
  countries: readonly string[] = COUNTRIES_NOW_SUPPORTED_COUNTRIES
): Promise<string[]> => {
  if (cachedCountriesNowCities) {
    return cachedCountriesNowCities;
  }
  if (countriesNowCitiesPromise) {
    return countriesNowCitiesPromise;
  }

  countriesNowCitiesPromise = Promise.all(
    countries.map(async (country) => {
      const response = await fetch(COUNTRIES_NOW_CITIES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      });

      if (!response.ok) {
        throw new Error(`Failed to load cities for ${country}`);
      }

      const data = (await response.json()) as { error: boolean; msg: string; data?: string[] };

      if (data.error || !Array.isArray(data.data)) {
        throw new Error(`CountriesNow error for ${country}: ${data.msg}`);
      }

      return data.data.filter(Boolean);
    })
  )
    .then((lists) => {
      const merged = Array.from(new Set(lists.flat()));
      merged.sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
      cachedCountriesNowCities = merged;
      return merged;
    })
    .catch((error) => {
      countriesNowCitiesPromise = null;
      console.error('Failed to load countries list from CountriesNow', error);
      throw error;
    });

  return countriesNowCitiesPromise;
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

export const getCardTypes = async (): Promise<ICardType[]> => {
  return _request<ICardType[]>(withBaseUrl('/api/Cards/types'), {
    method: 'GET',
  });
};

export const getCardStatuses = async (): Promise<ICardStatus[]> => {
  return _request<ICardStatus[]>(withBaseUrl('/api/Cards/statuses'), {
    method: 'GET',
  });
};

export const createCard = async (data: ICreateCardRequest, token?: string): Promise<ISearchCard> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return _authrequest<ISearchCard>(withBaseUrl('/api/Cards'), {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
};

export const getMyActiveCards = async (token: string): Promise<ISearchCard[]> => {
  return _authrequest<ISearchCard[]>(withBaseUrl('/api/Cards/my/active'), {
    method: 'GET',
    headers: withAuthHeaders(token),
  });
};

export const getMyArchiveCards = async (token: string): Promise<ISearchCard[]> => {
  return _authrequest<ISearchCard[]>(withBaseUrl('/api/Cards/my/archive'), {
    method: 'GET',
    headers: withAuthHeaders(token),
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

export const requestPasswordReset = async (email: string): Promise<void> => {
  return _request<void>(withBaseUrl('/api/auth/forgot-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (data: IResetPasswordRequest): Promise<IAuthResponse> => {
  return _request<IAuthResponse>(withBaseUrl('/api/auth/reset-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const withAuthHeaders = (token: string, extra?: HeadersInit): HeadersInit => ({
  ...(extra ?? {}),
  Authorization: `Bearer ${token}`,
});

export const getUsers = async (token: string): Promise<IUser[]> => {
  return _authrequest<IUser[]>(withBaseUrl('/api/users'), {
    method: 'GET',
    headers: withAuthHeaders(token),
  });
};

export const getUserById = async (id: string, token: string): Promise<IUser> => {
  return _authrequest<IUser>(withBaseUrl(`/api/users/${id}`), {
    method: 'GET',
    headers: withAuthHeaders(token),
  });
};

export const updateUser = async (id: string, data: IUpdateUserRequest, token: string): Promise<IUser> => {
  return _authrequest<IUser>(withBaseUrl(`/api/users/${id}`), {
    method: 'PUT',
    headers: withAuthHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
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
