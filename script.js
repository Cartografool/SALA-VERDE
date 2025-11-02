// --- Dados de diálogo ---
const dialogo = [
  "FALA RAPAZIADA!!!",
  "Tô ligado que vocês ralaram demais pra chegar aqui...",
  "Passaram por cada fita que eu e minha tropa bolou...",
  "Mesmo perdendo uns parceiro no caminho...",
  "Mas agora eu quero saber na moral:",
  "Quantos de vocês ainda tão aí firmeza?",
];

const respostaAlta = [
  "KARALIOOOOOOOOOOOOOOOOO",
  "SOBROU GERAL AINDA?!",
  "Brabo demais, na moral.",
  "Mas fala tu...",
  "Cês viraram irmão nessa caminhada, né não?",
  "Querem sair todo mundo junto...",
  "Mesmo que nem tenha saída...",
  "Mas... e se eu disser que TEM SIM uma saída?",
  "Lembra da porta da PRIMEIRA SALA?",
  "Abri ela agora...",
  "!!!!!!!",
  "Sem querer... abri OUTRA COISA também.",
  "Aquela porta vermelha...",
  "...",
  "CORRE!",
];

const respostaBaixa = [
  "Hmm... então sobrou só os cria raiz mesmo...",
  "Poucos, mas pesadão.",
  "Isso que é time de verdade.",
  "Vocês passaram por coisa que ninguém acreditaria.",
  "E agora tão aqui, juntos.",
  "Mesmo sem saída...",
  "Mas e se eu disser que TEM SIM uma saída?",
  "Lembra da porta da PRIMEIRA SALA?",
  "Abri ela agora...",
  "!!!!!!!",
  "Sem querer... abri OUTRA COISA também.",
  "Aquela porta vermelha...",
  "...",
  "CORRE!",
];

// --- Elementos e variáveis ---
const box = document.getElementById("dialogueBox");
const overlay = document.getElementById("overlay");
const cursor = document.getElementById("cursor");
const profile = document.getElementById("profilePic");
const input = document.getElementById("user-input");

let i = 0;
let speed = 50;
let dialogIndex = 0;

// --- Som ---
const somTecla = new Audio("stuff/keyboard.wav");
somTecla.volume = 0.3;

// --- Cursor customizado ---
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// --- Animação do rosto ---
let mouthInterval;
let blinkTimeout;
let speaking = false;

const faces = {
  neutral: "face/face.png",
  mouth: "face/facemouth.png",
  closed: "face/closed.png",
};

// Boca alternando durante a fala
function startFaceAnim() {
  speaking = true;
  clearInterval(mouthInterval);
  profile.src = faces.mouth;

  // alterna boca aberta e fechada
  mouthInterval = setInterval(() => {
    if (!speaking) return;
    profile.src = profile.src.includes("facemouth")
      ? faces.neutral
      : faces.mouth;
  }, 180);
}

// para a boca quando termina a fala
function stopFaceAnim() {
  speaking = false;
  clearInterval(mouthInterval);
  profile.src = faces.neutral;
}

// Piscar independente (roda sempre)
function blinkLoop() {
  const nextBlink = 2000 + Math.random() * 4000; // entre 2 e 6s
  blinkTimeout = setTimeout(() => {
    const prevFace = profile.src;
    profile.src = faces.closed;
    setTimeout(() => {
      if (speaking && prevFace.includes("facemouth")) {
        profile.src = faces.mouth;
      } else {
        profile.src = faces.neutral;
      }
      blinkLoop(); // repete o ciclo
    }, 150);
  }, nextBlink);
}

// inicia o loop de piscar assim que a página carrega
blinkLoop();

// --- Funções de digitação ---
function digitar(texto, callback) {
  startFaceAnim(); // começa a "falar"
  if (i < texto.length) {
    box.innerHTML += texto.charAt(i);
    somTecla.currentTime = 0;
    somTecla.play();
    i++;
    setTimeout(() => digitar(texto, callback), speed);
  } else {
    stopFaceAnim(); // para quando termina
    if (callback) setTimeout(callback, 800);
  }
}

function mostrarDialogo(falas, onEnd) {
  if (dialogIndex < falas.length) {
    i = 0;
    box.innerHTML = "";
    digitar(falas[dialogIndex], () => {
      dialogIndex++;
      mostrarDialogo(falas, onEnd);
    });
  } else {
    if (onEnd) onEnd();
  }
}

function flicker(callback) {
  if (callback) callback();
}

// --- Sequência principal ---
function startDialogo() {
  dialogIndex = 0;
  mostrarDialogo(dialogo, () => {
    flicker(() => {
      input.classList.add("show");
      input.focus();
    });
  });
}

input.addEventListener("change", () => {
  input.classList.remove("show");
  const n = parseInt(input.value);
  box.innerHTML = "";
  dialogIndex = 0;

  const falas = n > 3 ? respostaAlta : respostaBaixa;

  mostrarDialogo(falas, () => {
    box.style.fontSize = "48px";
    box.style.color = "red";
    box.innerHTML = "CORRE!";
  });
});

window.onload = startDialogo;
