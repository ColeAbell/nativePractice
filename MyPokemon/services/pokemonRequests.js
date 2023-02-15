const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export async function getAllPokemon(url = apiUrl) {
  const headers = {
    method: 'GET',
    'Content-type': 'application/json',
  };
  const results = await fetch(url, headers);
  if (results.status === 200) {
    return await results.json();
  }
  throw new Error('Did not catch them all');
}

export async function getOnePokemon(url) {
  const results = await fetch(url);
  if (results.status === 200) {
    return await results.json();
  }
  throw new Error('Did not catch them all');
}
