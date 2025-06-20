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

      // Skip fetch for 'clear'
      if (command === "clear") {
        terminalOutput.innerHTML = "";
        const confirmLine = document.createElement("div");
        confirmLine.className = "line";
        confirmLine.textContent = "(terminal cleared)";
        terminalOutput.appendChild(confirmLine);
        return;
      }

      // Create line container for the command to be typed
      const newLine = document.createElement("div");
      newLine.className = "line";
      terminalOutput.appendChild(newLine);
    
      // Simulate typing "ls [command]" like a real terminal
      const typedCommand = `ls ${command}`;
      let charIndex = 0;

      function typeCommand() {
        if (charIndex < typedCommand.length) {
          newLine.textContent += typedCommand.charAt(charIndex);
          charIndex++;
          setTimeout(typeCommand, 100); // Matches intro speed
        } else {
          // After typing completes, fetch and render content
          fetchAndDisplayContent(command);
        }
      }

      typeCommand(); // Begin typing
    });


  });
}
