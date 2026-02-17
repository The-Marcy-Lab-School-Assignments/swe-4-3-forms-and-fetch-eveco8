import { getRandomPokemon, postDiscoveredPokemon } from './fetch-helpers.js';
import { renderPokemon, renderError, renderSuccess } from './dom-helpers.js'



const getAndRenderPokemon = async () => {
    const data = await getRandomPokemon()
        if (data.error) {
            console.log(`Error: ${error.message}`);
            renderError('Failed to load pokemon');
        } else {
            renderSuccess(`${data.data.name} was discovered!`);
            renderPokemon(data.data);
        }
}
getAndRenderPokemon();

const discoverButton = document.querySelector('#discover-button');
discoverButton.addEventListener('click', getAndRenderPokemon);


const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm); // gets all form data (formData object)
    const formValues = Object.fromEntries(formData); //turns data into js object

    formValues.favorite = contactForm.elements.favorite.checked

    try {
        const promise = await postDiscoveredPokemon(formValues); 
        if (promise.error) {
            console.log("Error: unable to capture Pokémon. Please try again later");
        }

        console.log(`Success: ${formValues.name} has been captured`)

        contactForm.reset()
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        console.log("Error: unable to capture Pokémon. Please try again later" )
    }
})



