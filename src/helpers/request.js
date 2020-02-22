const getHeaders = (isAuth) => isAuth ?
  {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.token}`} :
  {'Content-Type': 'application/json'};

const getBody = body => body ? JSON.stringify(body) : null;

export const request = async (method, isAuth, body, input) => {
  try {
    const options = { method, headers: getHeaders(isAuth), body: getBody(body) };
    const response = await fetch(input, options);
    return await response.json();
  } catch (err) {
    console.log('request error', err);
  }
};
