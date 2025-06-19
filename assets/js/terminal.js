const cmd = "ls Ali_Alzergawi";
const typed = document.getElementById("typed");
const nav = document.getElementById("nav");
const nextCmd = document.getElementById("next-cmd");
const terminalOutput = document.getElementById("terminal-output");

let i = 0;

function typeIntro() {
  if (i < cmd.length) {
    typed.textContent += cmd.charAt(i);
    i++;
    setTimeout(typeIntro, 100);
  } else {
    // HIDE the first blinking cursor
    document.querySelector("#cmd-line .cursor").style.display = "none";

    setTimeout(() => {
      nav.style.display = "block";
      nextCmd.style.display = "block";
    }, 300);
  }
}

window.onload = () => {
  typeIntro();
  setupNavListeners();
};

function setupNavListeners() {
  document.querySelectorAll("[data-command]").forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const command = e.target.dataset.command;

      // Simulate terminal command
      const typedLine = document.createElement("div");
      typedLine.className = "line";
      typedLine.textContent = `root@kali:~# cat ${command}`;
      terminalOutput.appendChild(typedLine);

      // Fetch content
      const res = await fetch(`content/${command}.html`);
      const html = await res.text();
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Append content line by line
      temp.querySelectorAll(".line").forEach(line => {
        const cloned = line.cloneNode(true);
        cloned.classList.add("output"); // Make this line white
        terminalOutput.appendChild(cloned);
      });

      // Move cursor down
      terminalOutput.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });
}
