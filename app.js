const button = document.querySelector(".talk");
const buttonStop = document.querySelector(".stop");
const content = document.querySelector(".content");

const SpeechRecognition = window.webkitSpeechRecognition;
const Recognition = new SpeechRecognition();
Recognition.continuous = true;
Recognition.interimResults = true;

Recognition.onstart = () => {
  console.log("You can speak");
};

Recognition.onresult = function (event) {
  console.log(event.results[0]);
};

button.addEventListener("click", () => {
  Recognition.start();
});
buttonStop.addEventListener("click", () => {
  Recognition.stop();
});

const ReadLoud = () => {};
