const button = document.querySelector(".talk");
const content = document.querySelector(".content");
const recordingCircle = document.querySelector("#recording-circle");
const synth = window.speechSynthesis;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const Recognition = new SpeechRecognition();
Recognition.lang = "es-ES";

const speech = new SpeechSynthesisUtterance();

speech.onstart = () => {
  button.classList.add("active");
};

speech.onend = () => {
  button.classList.remove("active");
  Recognition.start();
};

Recognition.onstart = () => {
  recordingCircle.classList.add("recording");
};

Recognition.onresult = function (event) {
  const Current = event.resultIndex;
  const transcript = event.results[Current][0].transcript;
  console.log(transcript);
  if (transcript.includes("te amo")) {
    ReadLoud("Yo tambien te amo, pero no tanto como Sebas te ama a ti");
  }
  if (transcript.includes("somos")) {
    ReadLoud(
      "Felicitaciones!! Haz completado el juego de lalacertijos. espera hasta el viernes. Sebas te dará tu premio"
    );
  }
  if (transcript.includes("ayuda")) {
    ReadLoud("Okay te ayudaré ");
    ReadLoud(
      "Ya tienes tu clave maestra completa. Une los trozos y decodificala en Base 64. Me cuentas que decía! "
    );
  }
};

Recognition.onend = () => {
  recordingCircle.classList.remove("recording");
};

button.addEventListener("click", () => {
  Recognition.stop();

  ReadLoud("Hola Hola Soy Friday, Es un gusto volverte a ver por aqui");
  ReadLoud("¿que necesitas?");
});

const ReadLoud = (message) => {
  speech.lang = "es-ES";
  speech.voice = window.speechSynthesis.getVoices()[8];
  speech.text = message;
  speech.rate = 1;
  speech.pitch = 0.7;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
};
