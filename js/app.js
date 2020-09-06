"use strict";
// includes dictionary.js

// --------------------------------------------------------
function getRandomNumber(min, max) {
  // working
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//                  *** LOCAL STORAGE ***
// --------------------------------------------------------
function getSettings() {
  // working
  // retrieve the real values and set defaults
  let singleWordsSetting = window.localStorage.getItem("Single") || "true";
  let compoundWordsSetting = window.localStorage.getItem("Compound") || "false";
  let tpGlyphsSetting = window.localStorage.getItem("Glyphs") || "false";
  let tpWordsSetting = window.localStorage.getItem("TPWord") || "false";
  let enWordsSetting = window.localStorage.getItem("EnglishWord") || "true";

  //  this converts strings to boolean using logic
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
  // working
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
function handleAnswerClick() {
  // * * * * * THE SCORE PART IS BROKEN * * * * *
  // this event listener checks the answer
  const choice = document.querySelectorAll(".choice");
  const color_correct = "#afe632";
  const color_wrong = "#ff0403";
  const off_black = "#333";
  const off_white = "#f4f4f4";

  for (let i = 0; i < 4; i++) {
    choice[i].addEventListener("click", (event) => {
      // get answer from the DOM
      let answer = document.querySelector(".question").innerText;
      // compare to clicked answer
      let chosenAnswer = event.target.innerText;
      if (answer === chosenAnswer) {
        event.target.style.backgroundColor = color_correct;
        event.target.style.color = off_black;
        //   score_plus();
      } else {
        event.target.style.backgroundColor = color_wrong;
        event.target.style.color = off_white;
        //   score_minus();
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
function glyphQuestion(useThisDictionary) {
  // add tp-glyphs class
  document.querySelector(".question").classList.add("tp-glyphs");
  // need to set 0 to tokiPonaWord and 1 to tokiPonaCompound
  for (let i = 0; i < 4; i++) {
    if (useThisDictionary === 0) {
      document.getElementById("choice-" + i).innerText =
        tokiPonaWord[getRandomNumber(0, tokiPonaWord.length)].word;
    } else {
      // use the other dictionary (tokiPonaCompound)
    }
  }

  // TODO * * *  CHECK FOR DUPES * * *

  // Choose a correct answer from one of the choices and put it in DOM
  let answer = document.getElementById("choice-" + getRandomNumber(0, 3))
    .innerText;
  document.querySelector(".question").innerText = answer;
}

// --------------------------------------------------------
function tokiPonaQuestion(useThisDictionary) {
  "use strict";
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

  // pick a number between 0 - 3 to be the correct answer
  chosenAnswer = storeRandomNumber[getRandomNumber(0, 3)];

  // get original tp word and and insert as question
  document.querySelector(".question").innerText =
    tokiPonaWord[chosenAnswer].word;

  // TODO * * *  CHECK FOR DUPES * * *
  // TODO * * *  BROKE THE SCORE SYSTEM - FIXIT * * *
}

// --------------------------------------------------------
function main() {
  // const singleTPWord = 0;
  // const compoundTPWord = 1;
  let useThisDictionary = 0;

  // get settings from localStorage
  getSettings();
  // if the settings are changed, save them
  handleSettingChange();

  // *** initialize the answer click handler ***
  handleAnswerClick();

  // PROGRAM LOGIC BEGINS - CONTROLLED BY SETTINGS
  let radioSingle = document.getElementById("radio-single");
  let radioTPGlyph = document.getElementById("radio-tp-glyph");
  let radioTPWords = document.getElementById("radio-tp-words");
  let radioEnWords = document.getElementById("radio-en-words");

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
  if (radioEnWords) {
    if (radioSingle) {
      //use single dictionary
      useThisDictionary = 0;
      // englishQuestion();
    } else {
      // randomly use both
      useThisDictionary = getRandomNumber(0, 1);
    }
  }
}

console.log("Show akesi: " + tokiPonaWord[1].word);
console.log("Show akesi definition: " + tokiPonaWord[1].definition[2]);

console.log("Show snake: " + tokiPonaCompound[1].word);
console.log("Show snake definition: " + tokiPonaCompound[1].definition[0]);

// --------------------------------------------------------
main();
// TODO * * * * * NEED NEW SCORE SYSTEM
