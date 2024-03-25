const baseUrl = 'http://62.113.118.59:1337/api/';

const handleResponse = async (response: any) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Что-то пошло не так');
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

export const fetchSignIn = async (login: string, password: string) => {
  try {
    return postRequest(`${baseUrl}user-login`, { login, password });
  } catch (error) {
    throw new Error('Ошибка сети');
  }
};

export const fetchSignUp = async (
  username: string,
  login: string,
  password: string,
  email: string
) => {
  try {
    return postRequest(`${baseUrl}user-register`, {
      username,
      login,
      password,
      email,
    });
  } catch (error) {
    throw new Error('Ошибка сети');
  }
};

export const fetchUserInfo = async () => {
  try {
    return getRequest(`${baseUrl}user-info`);
  } catch (error) {
    throw new Error('Ошибка сети');
  }
};
