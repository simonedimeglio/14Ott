// Elementi DOM
const postContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("search");

// Funzione per mostrare lo spinner
function showLoader() {
  loader.style.display = "block";
}

// Funzione per nascondere lo spinner
function hideLoader() {
  loader.style.display = "none";
}

// Funzione per creare le card dei post
function createPostCard(post) {
  return `
    <div class="card">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <a href="./details.html?userId=${post.userId}">Vai ai dettagli dell'utente</a>
    </div>
  `;
}

// Funzione per caricare i post
function loadPosts(query = "") {
  showLoader(); // Mostro il loader

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        // condizione che controlla se la risposta HTTP non è stata completata con successo
        // response.ok è un booleano che è true solo se lo stato HTTP della risposta è nel range 200-299
        throw new Error("Errore nel recupero dei post");
        // throw -> keyword che genera un'eccezione
        // new Error() -> crea un oggetto Error con il messaggio specificato da noi
        // questo errore sarà gestito dal blocco catch
      }
      return response.json();
    })
    .then((posts) => {
      hideLoader(); // Nascondo il loader

      // Filtra i post in base al titolo
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );

      // Se il titolo non è presente stampo un messaggio di errore, altrimenti filtro.
      if (filteredPosts.length === 0) {
        postContainer.innerHTML = "<p>Nessun post trovato</p>";
      } else {
        postContainer.innerHTML = filteredPosts.map(createPostCard).join("");
      }
    })
    .catch((error) => {
      hideLoader(); // Nascondo il loader
      postContainer.innerHTML = `<p>${error.message}</p>`; // Stampo il messaggio di errore in pagina
    });
}

// Event listener per la ricerca
searchInput.addEventListener("input", (e) => {
  const query = e.target.value; // La query assume il valore contenuto nell'input
  loadPosts(query); // Ricarica i post filtrati per il titolo che sto cercando
});

// Carica i post al caricamento della pagina
loadPosts();
