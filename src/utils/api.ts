import {IOptions, IGender, ILogin } from '../services/types/data';

const _url = "https://igorbakhtin1-dostavochkaapi-2cf2.twc1.net";

export const getGender = async (): Promise<Array<IGender>> => {
  return _request(`${_url}/Gender`, {
    method: "GET"
  });
};

export const registerUser = async (data: ILogin): Promise<any> => {
  return _authrequest(`${_url}/User/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: ILogin): Promise<any> => {
  return _authrequest(`${_url}/User/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const _request = (url: string, options?: IOptions) => {
  return fetch(url, options)
    .then((res) => _checkResponse(res))
    .then((res) => _checkSuccess(res))
    .catch((err) => {
      console.error(err);
      throw new Error('Network error');
    });
};

const _authrequest = (url: string, options?: IOptions) => {
  return fetch(url, options)
    .then((res) => _authCheckResponse(res))
    .then((res) => _authCheckSuccess(res))
    .catch((err) => {
      console.error(err);
      throw new Error('Network error');
    });
};

const _checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const _checkSuccess = (res: any) => {
  if (!res) {
    throw new Error(`Ошибка: ${res}`);
  }
  return res;
};

const _authCheckResponse = async (res: Response) => {
  // Проверка наличия тела ответа
  const contentType = res.headers.get('Content-Type');
  
  if (res.ok) {
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    } else {
      return {};
    }
  }
};

const _authCheckSuccess = (res: any) => {
  if (!res) {
    throw new Error(`Ошибка: ${res}`);
  }

  // Проверка наличия заголовков Set-Cookie
  const cookies = res.headers.get('Set-Cookie');
  if (cookies) {
    console.log('Cookies set by server:', cookies);
  } else {
    console.warn('No cookies were set by the server.');
  }

  return res;
};
