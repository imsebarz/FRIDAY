const button = document.querySelector(".talk");
const content = document.querySelector(".content");
const recordingCircle = document.querySelector("#recording-circle");
const synth = window.speechSynthesis;
let login = false;
const pistas = [
  "La pista es: En elgún lugar muy frio, pero más frio de lo que piensas",
  "La pista es: Debajo de morfeo",
  "La pista es: Allá Duerme alguien que quieres mucho",
  "La pista es: Ahora es un lugar muy calienta, y casi se queda en la otra casa",
  "La pista es: Depronto se está secando con la ropa",
  "La pista es: En un lugar muy muy arriba",
];

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
  if (transcript.includes("regalos")) {
      if (pistas.length > 0) {
        const pista = pistas.pop();
        ReadLoud("Okay aquí una pista: ");
        ReadLoud(pista);
      } else {
        ReadLoud("Oh! Ya no hay mas regalos!! Feliz Cumpleaños!!");
        ReadLoud("Cumpleaños feliz, feliz");
        Recognition.stop();
      }
    }
};

Recognition.onend = () => {
  recordingCircle.classList.remove("recording");
};

button.addEventListener("click", () => {
  Recognition.stop();

    ReadLoud("Hola Hola Soy Friday, ¿que necesitas?");
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
