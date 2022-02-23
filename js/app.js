"use strict";

import { tokiPonaWord } from "./dictionary.js";

// currect answer state
let currentCorrectAnswer = 0;

// --------------------------------------------------------
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// --------------------------------------------------------
function getSettings() {
  // retrieve the stored values or use defaults
  let singleWordsSetting = window.localStorage.getItem("Single") || "true";
  let compoundWordsSetting = window.localStorage.getItem("Compound") || "false";
  let tpGlyphsSetting = window.localStorage.getItem("Glyphs") || "false";
  let tpWordsSetting = window.localStorage.getItem("TPWord") || "false";
  let enWordsSetting = window.localStorage.getItem("EnglishWord") || "true";

  //  convert strings to boolean
  singleWordsSetting = singleWordsSetting === "true";
  compoundWordsSetting = compoundWordsSetting === "true";
  tpGlyphsSetting = tpGlyphsSetting === "true";
  tpWordsSetting = tpWordsSetting === "true";
  enWordsSetting = enWordsSetting === "true";

  // set the radio buttons
  document.getElementById("radio-single").checked = singleWordsSetting;
  document.getElementById("radio-compound").checked = compoundWordsSetting;
  document.getElementById("radio-tp-glyph").checked = tpGlyphsSetting;
  document.getElementById("radio-tp-words").checked = tpWordsSetting;
  document.getElementById("radio-en-words").checked = enWordsSetting;
}

// --------------------------------------------------------
function saveSettings() {
  // get the radio buttons state -> convert to string
  let singleWordsSetting = document
    .getElementById("radio-single")
    .checked.toString();
  let compoundWordsSetting = document
    .getElementById("radio-compound")
    .checked.toString();
  let tpGlyphsSetting = document
    .getElementById("radio-tp-glyph")
    .checked.toString();
  let tpWordsSetting = document
    .getElementById("radio-tp-words")
    .checked.toString();
  let enWordsSetting = document
    .getElementById("radio-en-words")
    .checked.toString();

  // store the values from the radio buttons
  window.localStorage.setItem("Single", singleWordsSetting);
  window.localStorage.setItem("Compound", compoundWordsSetting);
  window.localStorage.setItem("Glyphs", tpGlyphsSetting);
  window.localStorage.setItem("TPWord", tpWordsSetting);
  window.localStorage.setItem("EnglishWord", enWordsSetting);
}

// --------------------------------------------------------
function score_plus() {
  let score = document.getElementById("score").innerText;
  score++;
  document.getElementById("score").innerText = score;
}

// --------------------------------------------------------
function score_minus() {
  let score = document.getElementById("score").innerText;
  score--;
  document.getElementById("score").innerText = score;
}

// --------------------------------------------------------
function resizeQuestionFont() {
  const questionLength = document.querySelector(".question").innerText.length;
  const questionSize = document.querySelector(".question");

  if (questionLength <= 12) {
    questionSize.style.fontSize = "2rem";
  } else if (questionLength > 12 && questionLength < 20) {
    questionSize.style.fontSize = "calc(100vw / 14)";
  } else if (questionLength >= 20) {
    questionSize.style.fontSize = "calc(100vw / 20)";
  }
}

// --------------------------------------------------------
function handleAnswerClick() {
  // event listener checks the answer & gives visual indicator
  const choice = document.querySelectorAll(".choice");
  const color_correct = "#afe632";
  const color_wrong = "#ff0403";
  const off_black = "#333";
  const off_white = "#f4f4f4";

  for (let i = 0; i < 4; i++) {
    choice[i].addEventListener("click", (event) => {
      // get the numbered className of the clicked choice
      let choiceClass = event.target.classList[1];
      // chop off the end and convert to a number
      choiceClass = parseInt(choiceClass.slice(-1));
      // compare with current correct answer state
      if (currentCorrectAnswer === choiceClass) {
        // Correct
        event.target.style.backgroundColor = color_correct;
        event.target.style.color = off_black;
        score_plus();
      } else {
        // Incorrect
        event.target.style.backgroundColor = color_wrong;
        event.target.style.color = off_white;
        score_minus();
      }
    });
  }
}

// --------------------------------------------------------
function handleSettingChange() {
  // set event listeners on radio buttons
  let allRadioButtons = document.querySelectorAll("input[type=radio]");

  for (let i = 0; i < allRadioButtons.length; i++) {
    allRadioButtons[i].addEventListener("change", (event) => {
      // if any buttons are changed, commit to local storage
      saveSettings();
    });
  }
}

// --------------------------------------------------------
function handleButtonClick() {
  const button = document.querySelector(".btn-next");

  button.addEventListener("click", () => {
    setTheBoard();
  });
}

// --------------------------------------------------------
function glyphQuestion(useThisDictionary) {
  const STANDARD_DICTIONARY = 0;
  let randomWord = 0;
  let storeRandomNumber = [];

  // add tp-glyphs class to .question
  document.querySelector(".question").classList.add("tp-glyphs");

  // create 4 answer choices
  for (let i = 0; i < 4; i++) {
    if (useThisDictionary === STANDARD_DICTIONARY) {
      // rnd num between 0 and length of dictionary
      randomWord = getRandomNumber(0, tokiPonaWord.length - 1);

      // insert 4 random answer choices
      document.getElementById("choice-" + i).innerText =
        tokiPonaWord[randomWord].word;
    } else {
      // use the compound dictionary
      // this feature not yet imlemented
    }

    // logout useful info
    console.log(
      "word",
      i + 1,
      "is",
      document.getElementById("choice-" + i).innerText,
      " - word number:",
      randomWord
    );

    // store all 4 random numbers
    storeRandomNumber[i] = randomWord;
  }

  // pick a number between 0 and 3 as correct answer
  let chosenAnswerIndex = getRandomNumber(0, 3);
  let chosenAnswer = storeRandomNumber[chosenAnswerIndex];

  //set the question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].word;

  // logout useful information
  console.log("Question:", document.querySelector(".question").innerText);
  console.log(
    "Correct Answer:",
    document.getElementById("choice-" + chosenAnswerIndex).innerText,
    "Choice #:",
    chosenAnswerIndex + 1
  );

  // set correct answer state
  currentCorrectAnswer = chosenAnswerIndex;

  // if any answers are duplicated, reload
  noDupes();

  // check for unsupported sitelen pona and reload
  // powe majuna san po n kapesi isipin
  let answer = document.querySelector(".question").innerText;
  if (
    answer === "powe" ||
    answer === "majuna" ||
    answer === "san" ||
    answer === "po" ||
    answer === "n" ||
    answer === "kapesi" ||
    answer === "isipin"
  ) {
    console.log(
      `${answer} is not supported by the linja pona font, so the board was reloaded`
    );
    // reload
    setTheBoard();
  }
}

// --------------------------------------------------------
function tokiPonaQuestion(useThisDictionary) {
  let storeRandomNumber = [];
  let randomWord = 0;

  // remove tp-glyphs class from .question
  document.querySelector(".question").classList.remove("tp-glyphs");

  // create 4 answer choices
  for (let i = 0; i < 4; i++) {
    // rnd num betwen 0 and length of dictionary
    randomWord = getRandomNumber(0, tokiPonaWord.length - 1);

    // insert 4 random answer choices
    document.getElementById("choice-" + i).innerText =
      tokiPonaWord[randomWord].definition[
        getRandomNumber(0, tokiPonaWord[randomWord].definition.length - 1)
      ];

    // logout useful info
    console.log(
      "word",
      i + 1,
      "is",
      document.getElementById("choice-" + i).innerText,
      " - word number:",
      randomWord
    );

    // store all 4 random numbers so we can figure out the question
    storeRandomNumber[i] = randomWord;
  }

  // pick a number between 0 - 3 to be the correct answer
  let chosenAnswerIndex = getRandomNumber(0, 3);
  let chosenAnswer = storeRandomNumber[chosenAnswerIndex];

  // set the question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].word;

  // logout useful information
  console.log("Question:", document.querySelector(".question").innerText);
  console.log(
    "Correct Answer:",
    document.getElementById("choice-" + chosenAnswerIndex).innerText,
    "Choice #:",
    chosenAnswerIndex + 1
  );

  // set correct answer state
  currentCorrectAnswer = chosenAnswerIndex;

  // if any answers are duplicated, reload
  noDupes();
}

// --------------------------------------------------------
function englishQuestion() {
  let storeRandomNumber = [];
  let randomWord = 0;

  //remove tp-glyph class from .question
  document.querySelector(".question").classList.remove("tp-glyphs");

  // create 4 answer choices
  for (let i = 0; i < 4; i++) {
    // rnd num between 0 and length of dictionary
    randomWord = getRandomNumber(0, tokiPonaWord.length - 1);

    // logout useful info
    console.log(
      "word",
      i + 1,
      "is",
      tokiPonaWord[randomWord].word,
      "- word number:",
      randomWord
    );

    // insert 4 toki pona word as answer choices
    document.getElementById("choice-" + i).innerText =
      tokiPonaWord[randomWord].word;

    // store the 4 random numbers to match the question and answers
    storeRandomNumber[i] = randomWord;
  }

  // pick a number between 0 - 3 to be the correct answer
  let chosenAnswerIndex = getRandomNumber(0, 3);
  let chosenAnswer = storeRandomNumber[chosenAnswerIndex];

  // set the question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].definition[
      getRandomNumber(0, tokiPonaWord[chosenAnswer].definition.length - 1)
    ];

  resizeQuestionFont();

  // logout useful information
  console.log("Question:", document.querySelector(".question").innerText);
  console.log(
    "Correct Answer:",
    tokiPonaWord[chosenAnswer].word,
    "Choice #:",
    chosenAnswerIndex + 1
  );

  // set current correct answer state
  currentCorrectAnswer = chosenAnswerIndex;

  // if any answer choices are duplicated, reload
  noDupes();
}

// --------------------------------------------------------
function clearTheBoard() {
  const off_black = "#333";
  const off_white = "#f4f4f4";

  for (let i = 0; i < 4; i++) {
    let choice = "choice-" + i;
    document.getElementById(choice).style.backgroundColor = off_black;
    document.getElementById(choice).style.color = off_white;
  }
}

// --------------------------------------------------------
function setTheBoard() {
  let useThisDictionary = 0;
  // use the settings
  let radioSingle = document.getElementById("radio-single");
  let radioTPGlyph = document.getElementById("radio-tp-glyph");
  let radioTPWords = document.getElementById("radio-tp-words");
  let radioEnWords = document.getElementById("radio-en-words");

  // remove colors for right/wrong answers
  clearTheBoard();

  // tp glyphs -> tp words
  if (radioTPGlyph.checked) {
    console.log("sitelen pona questions -> toki pona answers");
    if (radioSingle) {
      // use single dictionary for glyphs
      useThisDictionary = 0;
      glyphQuestion(useThisDictionary);
    } //else {
    // switch bewteen dictionaries randomly
    // not yet implemented
    useThisDictionary = getRandomNumber(0, 1);
    //}
  }

  // tp words -> english words
  if (radioTPWords.checked) {
    console.log("toki pona questions -> english answers");
    if (radioSingle) {
      // use single dictionary
      useThisDictionary = 0;
      tokiPonaQuestion(useThisDictionary);
    } else {
      // not yet implemented
      // use both randomly
      useThisDictionary = getRandomNumber(0, 1);
    }
  }

  // english question -> tp answers
  if (radioEnWords.checked) {
    console.log("english questions -> toki pona answers");
    if (radioSingle) {
      //use single dictionary
      useThisDictionary = 0;
      englishQuestion();
    } else {
      // not yet implemented
      // randomly use both
      useThisDictionary = getRandomNumber(0, 1);
    }
  }
}

// --------------------------------------------------------
function noDupes() {
  // if there are duplicate answers, reload the board
  let one = document.getElementById("choice-0").innerText;
  let two = document.getElementById("choice-1").innerText;
  let three = document.getElementById("choice-2").innerText;
  let four = document.getElementById("choice-3").innerText;

  if (
    one === two ||
    one === three ||
    one === four ||
    two === three ||
    two === four ||
    three === four
  ) {
    console.log("-------------------------------------------");
    console.log("Duplicate answer detected - reloading board");
    console.log("-------------------------------------------");

    setTheBoard();
  }
}

// --------------------------------------------------------
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".slide-menu");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    // burger animation
    burger.classList.toggle("toggle");
  });
};

// --------------------------------------------------------
function main() {
  // get settings from localStorage
  getSettings();

  // if the settings are changed, save them
  handleSettingChange();

  // initialize the answer click handler
  handleAnswerClick();
  handleButtonClick();

  // the settings menu
  navSlide();

  // let's go
  setTheBoard();
}

// --------------------------------------------------------
main();
