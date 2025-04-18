export function storeLoginState(loginData) {
  localStorage.setItem('loginData', JSON.stringify(loginData));
}

export function loadLoginState() { 
  const defaultState = { id: 0, role: "guest" };
  const loginStateInStorage = localStorage.getItem('loginData');

  if (!loginStateInStorage) return defaultState;
  try {
    return JSON.parse(loginStateInStorage);
  } catch {
    return defaultState;
  }
}
