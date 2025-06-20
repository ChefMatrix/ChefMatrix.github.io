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

  /**
 * Fetches HTML content for a command and appends it to the terminal output.
 * Applies .output class to each line.
 */
async function fetchAndDisplayContent(command) {
  try {
    const res = await fetch(`content/${command}.html`);
    const html = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = html;

    temp.querySelectorAll(".line").forEach(line => {
      const cloned = line.cloneNode(true);
      cloned.classList.add("output"); // Make text white
      terminalOutput.appendChild(cloned);
    });

    terminalOutput.scrollIntoView({ behavior: "smooth", block: "end" });
  } catch (err) {
    const errorLine = document.createElement("div");
    errorLine.className = "line output";
    errorLine.textContent = `(error loading content for "${command}")`;
    terminalOutput.appendChild(errorLine);
  }
}

}
