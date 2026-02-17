export const renderPokemon = (pokemonObj) => {
    const discoveredList = document.querySelector('#discovered-list');

    const discovered = document.createElement('li');

    const img = document.createElement('img');
    img.src = pokemonObj.sprite;

    const p1 = document.createElement('p');
     p1.textContent = pokemonObj.name;

    const p2 = document.createElement('p');
     p2.textContent = pokemonObj.types;

    discovered.append(img, p1, p2);
    discoveredList.append(discovered);
}

export const renderError = (msg) => {
    const success = document.querySelector('#success');
    success.textContent = '';

    const error = document.querySelector('#error');
    error.textContent = msg;
}

export const renderSuccess = (msg) => {
    const error = document.querySelector('#error');
    error.textContent = '';
    
    const success = document.querySelector('#success');
    success.textContent = msg;
}