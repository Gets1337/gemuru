class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;

    // Todo Ты когда код откуда-то копируешь разберись что тут происходит!
    // Обычно в гугле, когда люди выкладывают, какой либо код. Он просто похож на твое решение, но делает что-то ещё
    // Никогда не копируй код, не разобравщись в нем! Иногда в коде есть хаки которые могут украсть твои данные итп
    // Гуглить и брать код из интернета абсолютно нормально дело. Но всегда нужно его читать и разбираться в нем
    // В данном примере ничего критичного, но мы с тобой даже не проходили это.
    // Человек который выложил этот код явно сам шарит что пишет
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

// Todo тут то уже ты мог поставить правильны тип у параметров login и password
export const fetchSignIn = async (login: any, password: any) => {
  try {
    // Todo если ты в пути используешь точку, то это обозначает чтобы пытаешься отправить запрос на другой доме.
    // Пример. .com в твоем случае .login
    return postRequest(`${BASE_URL}user.login`, { login, password });
  } catch (error) {
    throw new CustomError('Ошибка сети', 500);
  }
};

// Todo тут ты мог поставить правильны тип у параметров
export const fetchSignUp = async (
  username: string,
  login: string,
  password: string,
  email: string
) => {
  try {
    // Todo снова в пути точка
    return postRequest(`${BASE_URL}user-register`, {
      username,
      login,
      password,
      email,
    });
  } catch (error) {
    // Todo А как мы поняли что тут точно 500? Сюда может любая ошибка свалиться
    // Ещё раз разбирайся в том, что пишешь!
    // Ты в функции postRequest уже делаешь обработку ошибки.
    // А тут ты просто кладешь на неё болт и перезаписываешь новой)
    throw new Error('Ошибка сети');
  }
};

export const fetchUserInfo = async () => {
  try {
    return getRequest(`${BASE_URL}user-info`);
  } catch (error) {
    // Todo та же проблема что и выше
    throw new Error('Ошибка сети');
  }
};
