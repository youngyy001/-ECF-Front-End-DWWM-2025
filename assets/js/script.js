// Je récupère les éléments dont j'ai besoin grâce à leur ID 
         
// Bouton pour tirer les 12 horoscopes
const drawButton = document.getElementById("drawButton");  
// Div qui contiendra les 12 cartes horoscopes
const cardsContainer = document.getElementById("cardsContainer"); 
// constante stockant la clée API (ici)
const cleAPI = "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!";

// écouteur d'évènement sur le bouton (on l'écoute au moment du click)
drawButton.addEventListener("click", async () => {

  cardsContainer.textContent = "Chargement....";
 
// Appel de l'API
  try {
    const response = await fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ api_key: cleAPI })
    });

    if (!response.ok) 
        {throw new Error("Erreur lors de la récupération des données.") } ;

    const data = await response.json();
    const horoscope = data.horoscope;
    displayCards(horoscope);
  } catch (error) {
    errorDiv.textContent = `Erreur : ${error.message}`;
    errorDiv.classList.remove("hidden");
  }
});

function displayCards(horoscopes) {
  cardsContainer.textContent = "";
  Object.entries(horoscopes).forEach(([sign, message]) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${sign}</h3><p>${message}</p>`;
    cardsContainer.appendChild(card);
  });
}
