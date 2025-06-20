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

/**
 * Attaches click listeners to nav links, types the command, then fetches and displays the content.
 */
function setupNavListeners() {
  document.querySelectorAll("[data-command]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const command = e.target.dataset.command;

      // Handle the "clear" command instantly
      if (command === "clear") {
        terminalOutput.innerHTML = "";
        const confirmLine = document.createElement("div");
        confirmLine.className = "line";
        confirmLine.textContent = "(terminal cleared)";
        terminalOutput.appendChild(confirmLine);
        return;
      }

      // Simulate typing "ls [command]" like a real terminal
      const typedCommand = `ls ${command}`;
      // 🧹 Remove existing prompt line (with cursor) if it exists
      const existingPrompt = document.querySelector(".line.prompt");
        if (existingPrompt) {
          existingPrompt.remove();
        }

      const newLine = document.createElement("div");
      newLine.className = "line";
      terminalOutput.appendChild(newLine);

      let charIndex = 0;

      function typeCommandCharByChar() {
        if (charIndex < typedCommand.length) {
          newLine.textContent += typedCommand.charAt(charIndex);
          charIndex++;
          setTimeout(typeCommandCharByChar, 100); // Typing speed
        } else {
          // Once typing is done, fetch content
          fetchAndDisplayContent(command);
        }
      }

      typeCommandCharByChar();
    });
  });
}

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
      cloned.classList.add("output");
      terminalOutput.appendChild(cloned);
    });

    // Add a new prompt line at the end after showing content
    const promptLine = document.createElement("div");
    promptLine.className = "line prompt"; // Used for cleanup before typing
    promptLine.textContent = "root@kali:~# ";
    const cursor = document.createElement("span");
    cursor.className = "cursor bottom-cursor";
    cursor.textContent = "█";
    promptLine.appendChild(cursor);
    terminalOutput.appendChild(promptLine);

    terminalOutput.scrollIntoView({ behavior: "smooth", block: "end" });

  } catch (err) {
    const errorLine = document.createElement("div");
    errorLine.className = "line output";
    errorLine.textContent = `(error loading content for "${command}")`;
    terminalOutput.appendChild(errorLine);
  }
}

