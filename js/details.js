// Elementi DOM
const userDetailsContainer = document.getElementById("user-details");
const loader = document.getElementById("loader");

// Funzione per mostrare lo spinner
function showLoader() {
  loader.style.display = "block";
}

// Funzione per nascondere lo spinner
function hideLoader() {
  loader.style.display = "none";
}

// Recuperiamo i parametri della query string
// URLSearchParams è una classe JavaScript che ci permette di manipolare i parametri della query string
// (quella parte dell'URL dopo il simbolo "?" che passa informazioni tra pagine).
// window.location.search ci restituisce l'intera query string dall'URL, compreso il punto interrogativo.
const params = new URLSearchParams(window.location.search);

// Cerchiamo il parametro "userId" nella query string.
// .get() è un metodo di URLSearchParams che ci permette di ottenere il valore associato a una chiave specifica nella query string.
// In questo caso, stiamo cercando il valore di "userId", che è passato tramite l'URL (esempio: ?userId=1).
const userId = params.get("userId");

// Funzione per caricare i dettagli dell'utente
function loadUserDetails(userId) {
  showLoader(); // Mostro lo spinner

  fetch(`${USER_API_URL}/${userId}`)
    .then((response) => {
      // Gestione errore se la risposta non è ok
      if (!response.ok) {
        throw new Error("Errore nel recupero dell'utente");
      }
      return response.json(); // Convertiamo la risposta in JSON
    })
    .then((user) => {
      hideLoader(); // Nascondo lo spinner poiché i dati sono arrivati

      // Inserisco i dettagli dell'utente nel DOM
      userDetailsContainer.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Telefono: ${user.phone}</p>
        <p>Azienda: ${user.company.name}</p>
      `;
    })
    .catch((error) => {
      hideLoader(); // Nascondo lo spinner anche in caso di errore
      userDetailsContainer.innerHTML = `<p>${error.message}</p>`; // Mostro il messaggio di errore
    });
}

// Carico i dettagli dell'utente usando l'userId
// Verifichiamo se l'userId è presente nella query string
if (userId) {
  loadUserDetails(userId);
} else {
  // Se l'userId non è presente, mostriamo un messaggio di errore
  userDetailsContainer.innerHTML = "<p>Nessun ID utente fornito</p>";
}
