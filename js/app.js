// includes dictionary.js

// --------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//                  *** LOCAL STORAGE ***
// --------------------------------------------------------
function loadSettings() {
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
  const choice = document.querySelectorAll(".choice");

  for (let i = 0; i < 4; i++) {
    choice[i].addEventListener("click", (event) => {});
  }
  // store the question in glyph
  // let glyph = document.getElementById("glyph").innerText;
  // // store the answer you clicked on
  // answer = event.target.innerText;
  // // compare q and a
  // if (glyph === answer) {
  //   event.target.style.backgroundColor = color_correct;
  //   event.target.style.color = off_black;
  //   score_plus();
  // } else {
  //   event.target.style.backgroundColor = color_wrong;
  //   event.target.style.color = off_white;
  //   score_minus();
  // }
}

// --------------------------------------------------------
function handleSettingsButton() {
  const btnSettings = document.querySelector(".btn-settings");
  // TURN INTO MODAL NEEDS CONTAINER
  btnSettings.addEventListener("click", (event) => {
    // do something
    const radioSettings = (document.querySelector(
      ".radio-settings"
    ).style.display = "grid");
  });
}

// --------------------------------------------------------
function main() {}
loadSettings();
// choose which question and answers to get based on settings

// saveSettings(); <-- call save settings on modal close button

// check and load single/compound settings <-- DO NEXT

// check and load glyph/nimi/word settings <-- DO NEXY
// set answer choices

// *** initialize the answer click handler ***
handleAnswerClick();
// *** initialize settings button
handleSettingsButton();

console.log("Show akesi: " + tokiPonaWord[1].word);
console.log("Show akesi definition: " + tokiPonaWord[1].definition[2]);
// --------------------------------------------------------
main();
