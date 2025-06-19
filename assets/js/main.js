const cmd = "ls Ali_Alzergawi";
const typedElem = document.getElementById("typed");
const nav = document.getElementById("nav");
let i = 0;

function typeCommand() {
  if (i < cmd.length) {
    typedElem.textContent += cmd.charAt(i);
    i++;
    setTimeout(typeCommand, 100);
  } else {
    setTimeout(() => {
      nav.style.display = "block";
    }, 300);
  }
}

window.onload = typeCommand;
