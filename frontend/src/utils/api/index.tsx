class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

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

export const fetchSignIn = async (login: any, password: any) => {
  try {
    const response = await fetch('http://62.113.118.59:1337/api/user.login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
    return handleResponse(response);
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
    const response = await fetch(
      'http://62.113.118.59:1337/api/user.register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, login, password, email }),
      }
    );
    return handleResponse(response);
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await fetch('http://62.113.118.59:1337/api/user-info');
    return handleResponse(response);
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};
