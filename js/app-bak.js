const color_correct = "#afe632";
const color_wrong = "#ff0403";
const off_black = "#333";
const off_white = "#f4f4f4";

// --------------------------------------------------------
function score_plus() {
  score = document.getElementById("score").innerText;
  score++;
  document.getElementById("score").innerText = score;
}

// --------------------------------------------------------
function score_minus() {
  score = document.getElementById("score").innerText;
  score--;
  document.getElementById("score").innerText = score;
}

// --------------------------------------------------------
function random_num(min) {
  let random = Math.floor(Math.random() * min) + 0;
  return random;
}

// --------------------------------------------------------
function answer_check() {
  let choice = document.getElementsByClassName("choice");

  for (let i = 0; i < 4; i++) {
    choice[i].addEventListener("click", (event) => {
      // store the question in glyph
      let glyph = document.getElementById("glyph").innerText;
      // store the answer you clicked on
      answer = event.target.innerText;
      // compare q and a
      if (glyph === answer) {
        event.target.style.backgroundColor = color_correct;
        event.target.style.color = off_black;
        score_plus();
      } else {
        event.target.style.backgroundColor = color_wrong;
        event.target.style.color = off_white;
        score_minus();
      }
    });
  }
}

// --------------------------------------------------------
function clear_board() {
  // resets colors
  for (let i = 0; i < 4; i++) {
    choice = "choice-" + i;
    document.getElementById(choice).style.backgroundColor = off_black;
    document.getElementById(choice).style.color = off_white;
  }
}

// --------------------------------------------------------
function next_button() {
  // set event listener on next button
  let button = document.getElementById("btn-next");
  button.addEventListener("click", (event) => {
    reload_quiz();
    clear_board();
  });
}

// --------------------------------------------------------
function no_dupes() {
  // This is ugly - but it works and is easy to understand
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
    reload_quiz();
  }
}

// --------------------------------------------------------
function words() {
  for (let i = 0; i < 4; i++) {
    random = random_num(nimi.length);
    document.getElementById("choice-" + i).innerText = nimi[random];
  }
  random = random_num(3);
  glyph = document.getElementById("choice-" + random).innerText;
  document.getElementById("glyph").innerText = glyph;
}

// --------------------------------------------------------
function compounds() {
  for (let i = 0; i < 4; i++) {
    random = random_num(nimi_nimi.length);

    document.getElementById("choice-" + i).innerText = nimi_nimi[random];
  }
  random = random_num(3);
  glyph = document.getElementById("choice-" + random).innerText;
  document.getElementById("glyph").innerText = glyph;
}

// --------------------------------------------------------
function reload_quiz() {
  let anu = document.getElementsByName("words");
  if (anu[0].checked) {
    words();
  } else {
    compounds();
  }
  no_dupes();
}

// --------------------------------------------------------
function main() {
  answer_check();
  next_button();
  reload_quiz();
}

// --------------------------------------------------------
main();
