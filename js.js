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
const stopButton = document.getElementById("stopButton");
const snelheidSelect = document.getElementById("snelheidSelect");

let huidigeMode = "kort";

const kunstwerkTekst = {
  kort:
    "De sterrennacht is een schilderij van Vincent van Gogh. Je ziet een donkere nacht met heldere sterren boven een stil dorp.",
  verdieping:
    "De lucht is vol beweging, met draaiende vormen, lichte sterren en een felle maan. Op de voorgrond staat een donkere boom. Het dorp onderaan voelt rustig en stil.",
  sfeer:
    "Dit kunstwerk voelt levendig en emotioneel. De lucht lijkt onrustig en energiek, terwijl het dorp juist stil en ver weg aanvoelt."
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

stopButton.addEventListener("click", () => {
  speechSynthesis.cancel();
});

updateTekst();