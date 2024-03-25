class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const BASE_URL = 'http://62.113.118.59:1337/api/';

const handleResponse = async (response: any) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new CustomError(
      errorData.message || 'Что-то пошло не так',
      response.status
    );
  }
  return response.json();
};

const getRequest = async (url: string) => {
  const response = await fetch(url);
  return handleResponse(response);
};

const postRequest = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const fetchSignIn = async (login: any, password: any) => {
  try {
    return postRequest(`${BASE_URL}user.login`, { login, password });
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};

export const fetchSignUp = async (
  username: any,
  login: any,
  password: any,
  email: any
) => {
  try {
    return postRequest(`${BASE_URL}user.register`, {
      username,
      login,
      password,
      email,
    });
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};

export const fetchUserInfo = async () => {
  try {
    return getRequest(`${BASE_URL}user-info`);
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};
