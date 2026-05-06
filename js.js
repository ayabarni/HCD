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
const playPauseButton = document.getElementById("playPauseButton");
const restartButton = document.getElementById("restartButton");
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
  kort: "Je luistert nu naar: korte samenvatting",
  verdieping: "Je luistert nu naar: verdiepende",
  sfeer: "Je luistert nu naar: sfeer"
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

  uitspraak.onend = () => {
    playPauseButton.textContent = "Afspelen";
  };

  speechSynthesis.speak(uitspraak);
}
const sfeerAudio = document.getElementById("sfeerAudio");

modeKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    huidigeMode = knop.dataset.mode;

    modeKnoppen.forEach((andereKnop) => {
      andereKnop.classList.remove("active");
    });

    knop.classList.add("active");
    updateTekst();

    speechSynthesis.cancel();
    playPauseButton.textContent = "Afspelen";

    if (sfeerAudio) {
      sfeerAudio.pause();
      sfeerAudio.currentTime = 0;
    }
  });
});

playPauseButton.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    playPauseButton.textContent = "Verder";

    if (sfeerAudio) {
      sfeerAudio.pause();
    }

  } else if (speechSynthesis.paused) {
    speechSynthesis.resume();
    playPauseButton.textContent = "Pauzeren";

    if (huidigeMode === "sfeer" && sfeerAudio) {
      sfeerAudio.play();
    }

  } else {
    spreekTekstAf();
    playPauseButton.textContent = "Pauzeren";

    if (huidigeMode === "sfeer" && sfeerAudio) {
      sfeerAudio.volume = 0.08;
      sfeerAudio.play();
    }
  }
});

restartButton.addEventListener("click", () => {
  spreekTekstAf();
  playPauseButton.textContent = "Pauzeren";

  if (huidigeMode === "sfeer" && sfeerAudio) {
    sfeerAudio.volume = 0.08;
    sfeerAudio.currentTime = 0;
    sfeerAudio.play();
  }
});

updateTekst();

// Extra informatie: kunstenaar & context
const extraInfoButton = document.getElementById("extraInfoButton");
const extraInfoSection = document.getElementById("extraInfoSection");
const extraAudioButton = document.getElementById("extraAudioButton");
const extraTekst = document.getElementById("extraTekst");

extraInfoButton.addEventListener("click", () => {
  speechSynthesis.cancel();

  extraInfoSection.classList.toggle("hidden");

  if (extraInfoSection.classList.contains("hidden")) {
    extraInfoButton.textContent = "Meer over de kunstenaar & context";
    extraAudioButton.textContent = "Afspelen";
  } else {
    extraInfoButton.textContent = "Verberg kunstenaar & context";
  }
});

extraAudioButton.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    extraAudioButton.textContent = "Verder";
  } else if (speechSynthesis.paused) {
    speechSynthesis.resume();
    extraAudioButton.textContent = "Pauzeren";
  } else {
    speechSynthesis.cancel();

    const extraUitspraak = new SpeechSynthesisUtterance(extraTekst.textContent);

    extraUitspraak.lang = "nl-NL";
    extraUitspraak.rate = Number(snelheidSelect.value);

    extraUitspraak.onend = () => {
      extraAudioButton.textContent = "Afspelen";
    };

    speechSynthesis.speak(extraUitspraak);
    extraAudioButton.textContent = "Pauzeren";
  }
});

