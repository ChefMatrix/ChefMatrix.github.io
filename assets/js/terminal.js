console.log("⚙️ terminal.js loaded!");

window.onload = () => {
  console.log("⚙️ window loaded");
  typeIntro();
  setupNavListeners();
};

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
    console.log("✅ Finished typing command.");

    // Remove the first cursor
    const topCursor = document.querySelector(".top-cursor");
    if (topCursor) topCursor.remove();

    // Show nav + second prompt
    setTimeout(() => {
      console.log("✅ Showing nav + next command");
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

      // Append typed command
      const typedLine = document.createElement("div");
      typedLine.className = "line";
      typedLine.textContent = `root@kali:~# ${command}`;
      terminalOutput.appendChild(typedLine);

      // Handle clear separately
      if (command === "clear") {
          terminalOutput.innerHTML = ""; // remove all output
          const confirmLine = document.createElement("div");
          confirmLine.className = "line";
          confirmLine.textContent = "(terminal cleared)";
          terminalOutput.appendChild(confirmLine);
          return;
        }

      // Fetch content for command
      const res = await fetch(`content/${command}.html`);
      const html = await res.text();
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Add content with .output class
      temp.querySelectorAll(".line").forEach(line => {
          const cloned = line.cloneNode(true);
          cloned.classList.add("output");
          terminalOutput.appendChild(cloned);
      });

      // Scroll to latest
      terminalOutput.scrollIntoView({ behavior: "smooth", block: "end" });
    });

  });
}
