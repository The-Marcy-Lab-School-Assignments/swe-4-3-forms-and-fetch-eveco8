# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:**

The bug is that nothing is being returned from the first `.then()`. This is important because it holds the promise returned by `response.json()` and if it is not returned then there is no value to use when the next `.then` is called, making it undefined. To fix this you just need to return `readingPromise`.

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**

This happens because `<script type="module">` enables ES Module syntax which requires the page to be served over `http://` not `file://`. This is because the browser will block the ES modules and fetch requests from `file://` since it requires a valid `http://` origin due to browser security rules and CORS. Instead the files should be hosted by a development server like vite that run over `http://`.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:**

We check `response.ok` before reading the response body to check if the response fails because `.catch()` only rejects the promise for network level errors. This means that `.catch()` will not run if there is a HTTP status error since the promise technically resolved. Checking `response.ok` allows us to check for the HTTP errors before trying to read the response body.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart")
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**

```js
const getJoke = async () => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart",
    );

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status}`);
    }

    const responseData = await response.json();

    return { data: responseData, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
```

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener("submit", (event) => {
  const name = form.elements.name.value;
  document.querySelector("#output").textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

Their code is missing the `event.preventDefault()` which prevents the browser's default behavior to reload and redirect the page. Without it the javascript will run but since the page reloads it immediately, the user won't be able to see anything.To fix this, the students needs to add the `event.preventDefault()` at the start of the event handler.

**Your Answer:**

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**
J. Create the HTML form with a name input and output elements for displaying results

E. Add a `'submit'` event listener to the form

B. Call `event.preventDefault()` to stop the page from reloading

G. Extract the Pokemon name from the form input

H. Send a GET request with `fetch()` using the Pokemon name in the URL

C. Check `response.ok` and throw an error if the response failed

A. Parse the response body with `await response.json()`

D. Update the DOM with the Pokemon's data

I. Reset the form with `form.reset()`

F. Handle errors in the `catch` block (display an error message)
