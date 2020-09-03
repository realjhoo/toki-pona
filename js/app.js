// includes dictionary.js

// --------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//                  *** LOCAL STORAGE ***
// --------------------------------------------------------
function getSettings() {
  // retrieve the real values and set defaults
  let singleWordsSetting = window.localStorage.getItem("Single") || "true";
  let compoundWordsSetting = window.localStorage.getItem("Compound") || "false";
  let tpGlyphsSetting = window.localStorage.getItem("Glyphs") || "false";
  let tpWordsSetting = window.localStorage.getItem("TPWord") || "false";
  let enWordsSetting = window.localStorage.getItem("EnglishWord") || "true";

  // log out
  // console.log(
  //   "LOAD: ",
  //   singleWordsSetting,
  //   compoundWordsSetting,
  //   tpGlyphsSetting,
  //   tpWordsSetting,
  //   enWordsSetting
  // );

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

  // log out
  // console.log(
  //   "SAVE: ",
  //   singleWordsSetting,
  //   compoundWordsSetting,
  //   tpGlyphsSetting,
  //   tpWordsSetting,
  //   enWordsSetting
  // );

  // retrieve the real values and set defaults
  window.localStorage.setItem("Single", singleWordsSetting);
  window.localStorage.setItem("Compound", compoundWordsSetting);
  window.localStorage.setItem("Glyphs", tpGlyphsSetting);
  window.localStorage.setItem("TPWord", tpWordsSetting);
  window.localStorage.setItem("EnglishWord", enWordsSetting);
}

// --------------------------------------------------------
function handleAnswerClick() {
  // this event listener checks the answer
  const choice = document.querySelectorAll(".choice");

  for (let i = 0; i < 4; i++) {
    const color_correct = "#afe632";
    const color_wrong = "#ff0403";
    const off_black = "#333";
    const off_white = "#f4f4f4";

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
      saveSettings();
    });
  }
}

// --------------------------------------------------------
function glyphQuestion(useThisDictionary) {
  for (let i = 0; i < 4; i++) {
    // TEMP VALUE OF DICTIONARY
    useThisDictionary = 0;
    if (useThisDictionary === 0) {
      document.getElementById("choice-" + i).innerText =
        tokiPonaWord[getRandomNumber(0, tokiPonaWord.length)].word;
    }
  }
  // THIS CHOSES A CORRECT ANSWER FROM ONE OF THE CHOICES
  let answer = document.getElementById("choice-" + getRandomNumber(0, 3))
    .innerText;
  document.querySelector(".question").innerText = answer;
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

  // choose which question and answers to get based on settings

  // *** initialize the answer click handler ***
  handleAnswerClick();

  // LOGIC CONTROLLED BY SETTINGS
  // (move to func?)
  let radioSingle = document.getElementById("radio-single");
  let radioTPGlyph = document.getElementById("radio-tp-glyph");
  let radioTPWords = document.getElementById("radio-tp-words");
  let radioEnWords = document.getElementById("radio-en-words");

  if (radioTPGlyph.checked) {
    if (radioSingle) {
      // use single dictionary
      useThisDictionary = 0;
      glyphQuestion();
    } else {
      // switch bewteen dictionaries randomly
      useThisDictionary = getRandomNumber(0, 1);
    }
    // single glyphs
  }

  if (radioTPWords.checked) {
    if (radioSingle) {
      // use single dictionary
      useThisDictionary = 0;
    } else {
      // use both randomly
      useThisDictionary = getRandomNumber(0, 1);
    }
  }

  if (radioEnWords) {
    if (radioSingle) {
      //use single dictionary
      useThisDictionary = 0;
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
// saveSettings(); <-- call save settings when modal closes
