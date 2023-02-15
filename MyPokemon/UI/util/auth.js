import axios from 'axios';

const API_KEY = 'AIzaSyABvHzIbLbgg6AsKTdv4hWi7HG-n7cLf_o';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
    const token = response.data.idToken;
    return token;
  } catch (e) {
    console.error(e);
  }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
