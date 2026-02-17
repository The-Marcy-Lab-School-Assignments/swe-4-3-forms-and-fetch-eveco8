const randomize = () => {
    let randomNum = Math.round(Math.random() * 150)
    if (randomNum === 0) {
        randomNum = 1
    }
    return randomNum
}

export const getRandomPokemon = async () => { 
    const pokemonObj = {}
    try {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomize()}`);
    if (!promise.ok) {
        throw Error(`Fetch failed. ${promise.status} ${promise.statusText}`);
    }
    const responseData = await promise.json()
    //console.log(responseData)

    pokemonObj.name = responseData.name

    pokemonObj.types = []

    responseData.types.forEach(obj => {{
        pokemonObj.types.push(obj.type.name)
    }}
    )

    pokemonObj.sprite = responseData.sprites.back_default

    //console.log(pokemonObj)

    return { data: pokemonObj, error: null };
}
    catch (error) {
        console.log(`Error: ${error.message}`);
        return{ data: null, error: error };
    }
}

export const postDiscoveredPokemon = async (formData) => { //request to upload data from form to formspree
    try {
        const promise = await fetch('https://formspree.io/f/mkovbbpy', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json', // <-- the data format we're sending
                'accept': 'application/json'        // <-- the data format we can receive
            }
        }) 
        if (!promise.ok) {
            throw Error(`Failed to submit. ${promise.status} ${promise.statusText}`);
        }
        const responseData = await promise.json();
        console.log(responseData) 

        return { data: responseData, error: null};
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return { data: null, error: error };
    }
}

