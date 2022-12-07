const app = document.querySelector("#app");
app.classList.add("bg-slate-500", "h-screen");

const FPS = 20;
const words = ["INVENTION", "POULET", "PENDU", "CHAUSSURE", "SERVIETTE"];
const getRandom = (max) => {
  return Math.floor(Math.random() * max);
};
const WORD = words[getRandom(words.length)];
console.log(WORD);
const used_letter = [];
let canPlay = true;
let remaing_lifes = 9;
const CODE_A = 65;
const CODE_M = 78;
const CODE_Z = 90;
let wordHidden = "";

for (let i = 0; i < WORD.length; i++) {
  if (i === 0 || i === WORD.length - 1) {
    wordHidden += WORD[i];
  } else {
    wordHidden += "-";
  }
}

const wordHiddenDisplayer = document.createElement("h2");
wordHiddenDisplayer.textContent = wordHidden;
wordHiddenDisplayer.classList.add("text-white", "text-center", "text-4xl");
app.appendChild(wordHiddenDisplayer);

const keyboardDisplayer = document.createElement("h2");
keyboardDisplayer.textContent = "KEYBOARD";
keyboardDisplayer.classList.add(
  "text-center",
  "text-white",
  "text-4xl",
  "py-5"
);
app.appendChild(keyboardDisplayer);

const keyboard = document.createElement("table");
keyboard.classList.add("border-collapse", "w-[95%]", "mx-[2.5%]");
app.appendChild(keyboard);

const row1 = document.createElement("tr");
keyboard.appendChild(row1);
const row2 = document.createElement("tr");
keyboard.appendChild(row2);

const check_life = () => {
  if (!wordHidden.includes("-")) {
    updateview();
    alert(
      "CONGRATULATION you have won!!!! \n Refresh the page to start another game"
    );
  } else if (remaing_lifes > 0) {
    return;
  } else {
    canPlay = false;
    alert("No lifes remainig! Please refresh to start another game");
  }
};

const replaceLetter = (str, index, replace) => {
  return str.substring(0, index) + replace + str.substring(index + 1);
};

const checkLetter = (letter) => {
  for (let i = 0; i < WORD.length; i++) {
    if (letter === WORD[i]) {
      wordHidden = replaceLetter(wordHidden, i, WORD[i]);
    }
  }
};

const buttonFunction = (button) => {
  if (canPlay) {
    if (used_letter.includes(button.textContent)) {
      alert("You have already used this letter. Please use another one");
      return;
    }
    button.classList.remove("bg-blue-400", "shadow-blue-400");
    if (WORD.includes(button.textContent)) {
      button.classList.add("bg-green-400", "shadow-green-400");
      checkLetter(button.textContent);
      check_life();
    } else {
      button.classList.add("bg-red-400", "shadow-red-400");
      remaing_lifes -= 1;
      check_life();
    }
    used_letter.push(button.textContent);
  } else {
    alert("No lifes remainig! Please refresh to start another game");
    return;
  }
};

for (let i = 0; i < 13; i++) {
  const letter = String.fromCharCode(CODE_A + i);
  const td = document.createElement("td");
  td.classList.add("border", "border-slate-400", "p-4");
  const button = document.createElement("button");
  button.classList.add(
    "px-5",
    "py-2",
    "bg-blue-400",
    "rounded-md",
    "shadow-md",
    "shadow-blue-400",
    "w-[100%]",
    "text-white"
  );
  button.textContent = letter;
  button.addEventListener("click", () => buttonFunction(button));
  if (wordHidden.includes(letter)) {
    buttonFunction(button);
  }
  td.appendChild(button);
  row1.appendChild(td);
}

for (let i = 0; i < 13; i++) {
  const letter = String.fromCharCode(CODE_M + i);

  const td = document.createElement("td");
  td.classList.add("border", "border-slate-400", "p-4");

  const button = document.createElement("button");
  button.classList.add(
    "px-5",
    "py-2",
    "bg-blue-400",
    "rounded-md",
    "shadow-md",
    "shadow-blue-400",
    "w-[100%]",
    "text-white"
  );
  button.textContent = letter;
  button.addEventListener("click", () => buttonFunction(button));
  if (wordHidden.includes(letter)) {
    buttonFunction(button);
  }
  td.appendChild(button);
  row2.appendChild(td);
}

const picture = document.createElement("img");
picture.src = `imgs/life${remaing_lifes}.png`;
app.appendChild(picture);

const updateview = () => {
  wordHiddenDisplayer.textContent = wordHidden;
  picture.srcset = `imgs/life${remaing_lifes}.png`;
  setTimeout(() => updateview(), 1000 / FPS);
};
updateview();
