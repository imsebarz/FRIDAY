const button = document.querySelector(".talk");
const content = document.querySelector(".content");
const recordingCircle = document.querySelector("#recording-circle");
const synth = window.speechSynthesis;
let login = false;
const pistas = [
  "nevera",
  "alcoba",
  "cama de tatys",
  "otra pista",
  "nose que más",
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
  if (login === false) {
    if (transcript.includes("lala" || "Laura" || "laura" || "pandita")) {
      login = true;
      ReadLoud(
        "Acceso Concedido, Ahora puedes hacerme preguntas. posdata: tengo pistas sobre tus regalos, guiño guiño"
      );
    } else {
      ReadLoud("Acceso Denegado!");
    }
  } else {
    if (transcript.includes("dónde") && !transcript.includes("regalos")) {
      ReadLoud("¿Dónde están que?");
    }
    if (transcript.includes("te amo")) {
      ReadLoud("Yo tambien te amo, pero no tanto como Sebas te ama a ti");
    }
    if (transcript.includes("Regalos")) {
      if (pistas.length > 0) {
        const pista = pistas.pop();
        ReadLoud("Okay aquí una pista: ");
        ReadLoud(pista);
      } else {
        ReadLoud("Ya no hay mas regalos!! Feliz Cumpleaños!!");
        ReadLoud("Cumpleaños feliz, feliz");
        Recognition.stop();
      }
    }
  }
};

Recognition.onend = () => {
  recordingCircle.classList.remove("recording");
};

button.addEventListener("click", () => {
  Recognition.stop();
  if (!login) {
    ReadLoud(
      "Hola, Para continuar primero necesito verificar tu identidad. ¿Cómo te llamas?"
    );
  } else {
    ReadLoud("Hola Soy Friday, ¿que necesitas?");
  }
});

const ReadLoud = (message) => {
  speech.lang = "es-ES";
  speech.voice = window.speechSynthesis.getVoices()[14];
  speech.text = message;
  speech.rate = 1;
  speech.pitch = 0.7;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
};
