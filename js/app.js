function score_plus() {
  score = document.getElementById("score").innerText;
  score++;
  document.getElementById("score").innerText = score;
}

function score_minus() {
  score = document.getElementById("score").innerText;
  score--;
  document.getElementById("score").innerText = score;
}

function random_num(min) {
  let random = Math.floor(Math.random() * min) + 0;
  return random;
}

function answer_check() {
  let choice = document.getElementsByClassName("choice");

  for (let i = 0; i < 4; i++) {
    choice[i].addEventListener("click", event => {
      let glyph = document.getElementById("glyph").innerText;
      answer = event.target.innerText;
      if (glyph === answer) {
        event.target.style.backgroundColor = "#afe632";
        event.target.style.color = "#333";
        score_plus();
      } else {
        event.target.style.backgroundColor = "#ff0403";
        event.target.style.color = "#f4f4f4";
        score_minus();
      }
    });
  }
}

function clear_board() {
  for (let i = 0; i < 4; i++) {
    choice = "choice" + i;
    document.getElementById("choice-" + i).style.backgroundColor = "#333";
    document.getElementById("choice-" + i).style.color = "#f4f4f4";
  }
}

function next_button() {
  let button = document.getElementById("btn_next");
  button.addEventListener("click", event => {
    reload_quiz();
    clear_board();
  });
}

function no_dupes() {
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
    console.log("There was a DUPE!!!!!!");
  }
}

function reload_quiz() {
  for (let i = 0; i < 4; i++) {
    random = random_num(126);
    document.getElementById("choice-" + i).innerText = nimi[random];
  }
  random = random_num(3);
  glyph = document.getElementById("choice-" + random).innerText;
  document.getElementById("glyph").innerText = glyph;
  no_dupes();
}

function main() {
  answer_check();
  next_button();
}

main();
