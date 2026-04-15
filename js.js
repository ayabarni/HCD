// const knop = document.getElementById("opslaan");

// knop.addEventListener("click", () => {
//     const gekozen = document.querySelector('input[name="startpunt"]:checked');

//     if (!gekozen) return;

//     const section = document.getElementById(gekozen.value);

//     if (section) {
//         section.focus();
//         section.scrollIntoView({
//             behavior: "smooth"
//         });
//     }
// });


const tekstOutput = document.getElementById("tekstOutput");
const statusOutput = document.getElementById("statusOutput");
const modeKnoppen = document.querySelectorAll(".mode-knop");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const snelheidSelect = document.getElementById("snelheidSelect");

let huidigeMode = "kort";

const kunstwerkTekst = {
  kort:
    "Het schilderij toont een nachtelijke lucht boven een dorp. De lucht is gevuld met heldere sterren en een grote maan. De sterren en wolken zijn geschilderd met draaiende, golvende lijnen. Op de voorgrond staat een hoge, donkere cipresboom. Onder de lucht ligt een dorp met kleine huizen en een kerk met een toren.",
  verdieping:
    "De sterrennacht werd geschilderd door Vincent van Gogh in 1889, tijdens zijn verblijf in een inrichting in Frankrijk. De bewegende lucht en sterke penseelstreken laten zien hoe Van Gogh de wereld op een emotionele manier ervaarde. De cipresboom kan gezien worden als een verbinding tussen de aarde en de hemel. Het contrast tussen het rustige dorp en de dynamische lucht kan wijzen op innerlijke spanning en emotie.",
  sfeer:
    " De lucht voelt levendig en onrustig, alsof alles beweegt. De sterren draaien en geven energie aan de nacht. Het dorp daaronder is stil en rustig, alsof iedereen slaapt. Er ontstaat een gevoel van rust en spanning tegelijk — een stille wereld onder een bewegende hemel."
};

const statusTekst = {
  kort: "Je luistert nu naar: korte uitleg",
  verdieping: "Je luistert nu naar: verdiepende uitleg",
  sfeer: "Je luistert nu naar: sfeer uitleg"
};

function updateTekst() {
  tekstOutput.textContent = kunstwerkTekst[huidigeMode];
  statusOutput.textContent = statusTekst[huidigeMode];
}

function spreekTekstAf() {
  speechSynthesis.cancel();

  const uitspraak = new SpeechSynthesisUtterance(
    `${statusTekst[huidigeMode]}. ${kunstwerkTekst[huidigeMode]}`
  );
  uitspraak.lang = "nl-NL";
  uitspraak.rate = Number(snelheidSelect.value);

  speechSynthesis.speak(uitspraak);
}

modeKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    huidigeMode = knop.dataset.mode;

    modeKnoppen.forEach((andereKnop) => {
      andereKnop.classList.remove("active");
    });

    knop.classList.add("active");
    updateTekst();
  });
});

playButton.addEventListener("click", spreekTekstAf);
pauseButton.addEventListener("click", () => {
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      pauseButton.textContent = "Pauze";
    } else {
      speechSynthesis.pause();
      pauseButton.textContent = "Verder";
    }
  }
});


updateTekst();