// ✅ terminal.js updated to handle typed navigation commands with single prompt behavior

console.log("⚙️ terminal.js loaded!");

window.onload = () => {
  typeIntro();
  setupNavListeners();
};

const cmd = "cd Ali_Alzergawi";
const typed = document.getElementById("typed");
const nav = document.getElementById("nav");
const nextCmd = document.getElementById("next-cmd");
const terminalOutput = document.getElementById("terminal-output");
const mainCursor = document.querySelector(".cursor");

let i = 0;

// Types the initial command slowly, then reveals nav and prompt
function typeIntro() {
  if (i < cmd.length) {
    typed.textContent += cmd.charAt(i);
    i++;
    setTimeout(typeIntro, 100);
  } else {
    mainCursor.style.display = "none"; // Hide first-line cursor

    // Show nav and next prompt line
    setTimeout(() => {
      nav.style.display = "block";
      nextCmd.style.display = "block";
    }, 300);
  }
}

function setupNavListeners() {
  document.querySelectorAll("[data-command]").forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const command = e.target.dataset.command;
      if (command === "github-repo") {
        window.open("https://github.com/ChefMatrix", "_blank");
        return;
      }

      // If clear, reset all content but leave nav and prompt
      if (command === "clear") {
        terminalOutput.innerHTML = "";
        const confirmLine = document.createElement("div");
        confirmLine.className = "line output";
        confirmLine.textContent = "(terminal cleared)";
        terminalOutput.appendChild(confirmLine);
        scrollToBottom();
        return;
      }

      // Hide the prompt temporarily and type the command slowly
      nextCmd.style.display = "none";

      const lineContainer = document.createElement("div");
      lineContainer.className = "line";
      terminalOutput.appendChild(lineContainer);

      await simulateTypedCommand(lineContainer, command);

      // Fetch and append output
      const res = await fetch(`content/${command}.html`);
      const html = await res.text();
      const temp = document.createElement("div");
      temp.innerHTML = html;

      temp.querySelectorAll(".line").forEach(line => {
        const cloned = line.cloneNode(true);
        cloned.classList.add("output");
        terminalOutput.appendChild(cloned);
      });

      // Show the prompt again
      nextCmd.style.display = "block";
      scrollToBottom();
    });
  });
}

// Simulate typing a command character by character
async function simulateTypedCommand(container, command) {
  return new Promise(resolve => {
    let j = 0;
    const prefix = "root@kali:~# ";
    container.textContent = prefix;

    function typeChar() {
      if (j < command.length) {
        container.textContent = prefix + command.slice(0, j + 1);
        j++;
        setTimeout(typeChar, 100);
      } else {
        resolve();
      }
    }

    typeChar();
  });
}

// Scroll terminal view to latest prompt/output
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
