// TTP2 Version B
// Toki Pona Practice App (Web Version)
// Copyright (c) 2020 jan Uwe
// All rights reserved
// lina pona font credit goes here
"use strict";
// dictionary stored in dictionary.js
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
      // compare with global current correct answer
      if (currentCorrectAnswer === choiceClass) {
        //        console.log("CORRECT!");
        event.target.style.backgroundColor = color_correct;
        event.target.style.color = off_black;
        score_plus();
      } else {
        //      console.log("nope!");
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
  // add tp-glyphs class to show question in glyph form
  document.querySelector(".question").classList.add("tp-glyphs");
  // set dictionary 0 to tokiPonaWord and 1 to tokiPonaCompound
  for (let i = 0; i < 4; i++) {
    if (useThisDictionary === 0) {
      document.getElementById("choice-" + i).innerText =
        tokiPonaWord[getRandomNumber(0, tokiPonaWord.length)].word;
    } else {
      // use the other dictionary (tokiPonaCompound)
    }
  }

  // if any answers choices are duplicated reload the board
  noDupes();

  // randomly choose a correct answer from one of the choices and display
  let chosenAnswerIndex = getRandomNumber(0, 3);
  let answer = document.getElementById("choice-" + chosenAnswerIndex).innerText;
  document.querySelector(".question").innerText = answer;
  // set the global current correct answer
  currentCorrectAnswer = chosenAnswerIndex;
}

// --------------------------------------------------------
function tokiPonaQuestion(useThisDictionary) {
  let storeRandomNumber = [];
  let randomWord = 0;
  let chosenAnswer = 0;

  // remove tp-glyphs class to show toki pona word, not glyph
  document.querySelector(".question").classList.remove("tp-glyphs");

  // loop to create 4 answer choices
  for (let i = 0; i < 4; i++) {
    // store rnd# so we can match question/answer
    randomWord = getRandomNumber(0, tokiPonaWord.length - 1);

    // insert 4 random answer choices
    document.getElementById("choice-" + i).innerText =
      tokiPonaWord[randomWord].definition[
        getRandomNumber(0, tokiPonaWord[randomWord].definition.length - 1)
      ];

    // store all 4 random numbers so we can figure out the question
    storeRandomNumber[i] = randomWord;
  }

  // if any answers choices are duplicated reload the board
  noDupes();

  // pick a number between 0 - 3 to be the correct answer
  let chosenAnswerIndex = getRandomNumber(0, 3);
  chosenAnswer = storeRandomNumber[chosenAnswerIndex];

  //  console.log("Current Correct Answer: ", currentCorrectAnswer);

  // get original tp word and and insert as question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].word;

  // set the global current correct answer
  currentCorrectAnswer = chosenAnswerIndex;
}

// --------------------------------------------------------
function englishQuestion() {
  let storeRandomNumber = [];
  let randomWord = 0;
  let chosenAnswer = 0;
  // question in english -> answers in toki
  //remove tp-glyph class from .question
  document.querySelector(".question").classList.remove("tp-glyphs");

  // loop to create 4 answer choices
  for (let i = 0; i < 4; i++) {
    randomWord = getRandomNumber(0, tokiPonaWord.length - 1);

    // insert 4 tp word as answer choices
    document.getElementById("choice-" + i).innerText =
      tokiPonaWord[randomWord].word;

    // store random num so we can match quest/ans
    storeRandomNumber[i] = randomWord;
  }

  noDupes();
  // pick a number between 0 - 3 to be the correct answer
  let chosenAnswerIndex = getRandomNumber(0, 3);
  chosenAnswer = storeRandomNumber[chosenAnswerIndex];

  // get original tp word and and insert as question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].definition[
      getRandomNumber(0, tokiPonaWord[chosenAnswer].definition.length - 1)
    ];

  // set the global current correct answer
  currentCorrectAnswer = chosenAnswerIndex;
}

// --------------------------------------------------------
function clearTheBoard() {
  //  const color_correct = "#afe632";
  //  const color_wrong = "#ff0403";
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
  // PROGRAM LOGIC BEGINS - CONTROLLED BY SETTINGS
  let radioSingle = document.getElementById("radio-single");
  let radioTPGlyph = document.getElementById("radio-tp-glyph");
  let radioTPWords = document.getElementById("radio-tp-words");
  let radioEnWords = document.getElementById("radio-en-words");

  // remove colors for right/wrong answers
  clearTheBoard();

  // * * *  * * * * * * * * * *  * * * * *
  // DO SINGLE WORDS FIRST FOR EACH OPTION
  // * *  * * * * * * * * *  * * * * * * *

  // glyphs -> tp words
  if (radioTPGlyph.checked) {
    if (radioSingle) {
      // use single dictionary for glyphs
      useThisDictionary = 0;
      glyphQuestion(useThisDictionary);
    } //else {
    // switch bewteen dictionaries randomly
    //useThisDictionary = getRandomNumber(0, 1);
    //}
  }

  // tp-words -> english words
  if (radioTPWords.checked) {
    console.log("tp words");
    if (radioSingle) {
      // use single dictionary
      useThisDictionary = 0;
      tokiPonaQuestion(useThisDictionary);
    } else {
      // use both randomly
      useThisDictionary = getRandomNumber(0, 1);
    }
  }

  // english -> tp words
  if (radioEnWords.checked) {
    console.log("english words");
    if (radioSingle) {
      //use single dictionary
      useThisDictionary = 0;
      englishQuestion();
    } else {
      // randomly use both
      useThisDictionary = getRandomNumber(0, 1);
    }
  }
}

// --------------------------------------------------------
function noDupes() {
  // this is ugly but easy to understand
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
    // reload the quiz because there are duplicate answers
    setTheBoard();
  }
}

// --------------------------------------------------------
function main() {
  // const singleTPWord = 0;
  // const compoundTPWord = 1;

  // get settings from localStorage
  getSettings();
  // if the settings are changed, save them
  handleSettingChange();

  // *** initialize the answer click handler ***
  handleAnswerClick();
  handleButtonClick();
  setTheBoard();
}

// log out exemplars
console.log("Show akesi: " + tokiPonaWord[1].word);
console.log("Show akesi definition: " + tokiPonaWord[1].definition[2]);

console.log("Show snake: " + tokiPonaCompound[1].word);
console.log("Show snake definition: " + tokiPonaCompound[1].definition[0]);

// --------------------------------------------------------
// Let the app begin
main();

// TODO * * * * * re-enable compound words
// TODO * * * * * fix up compound dictionary ?
// TODO * * * * * cleanup code
