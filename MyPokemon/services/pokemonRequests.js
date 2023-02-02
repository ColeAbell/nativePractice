const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export async function getAllPokemon(url = apiUrl) {
  const results = await fetch(url);
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
