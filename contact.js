(() => {
  "use strict";

  const line1 = document.getElementById("bootLine1");
  const line2 = document.getElementById("bootLine2");
  const form = document.getElementById("terminalForm");
  const status = document.getElementById("terminalStatus");
  const nameField = document.getElementById("fieldName");
  const messageField = document.getElementById("fieldMessage");

  function typeLine(el, text, speed, onDone) {
    let i = 0;
    (function tick() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else if (onDone) {
        onDone();
      }
    })();
  }

  typeLine(line1, "> establishing secure connection ...", 22, () => {
    setTimeout(() => {
      typeLine(line2, "> channel open. state your message.", 22, () => {
        form.hidden = false;
      });
    }, 250);
  });

  const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

  function scrambleReveal(el, finalText, duration = 700) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        const charThreshold = i / finalText.length;
        if (t > charThreshold) {
          out += finalText[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameField.value.trim();
    const message = messageField.value.trim();

    if (!message) {
      scrambleReveal(status, "ERROR: NO MESSAGE PAYLOAD DETECTED.", 400);
      messageField.focus();
      return;
    }

    scrambleReveal(status, "ENCRYPTING PAYLOAD ...", 500);

    setTimeout(() => {
      scrambleReveal(status, "MESSAGE ENCRYPTED. HANDING OFF TO MAIL CLIENT ...", 600);
      const subject = encodeURIComponent("Secure transmission from " + (name || "an anonymous agent"));
      const body = encodeURIComponent(message + (name ? `\n\n— ${name}` : ""));
      setTimeout(() => {
        window.location.href = `mailto:sidtatavarthi@gmail.com?subject=${subject}&body=${body}`;
      }, 700);
    }, 550);
  });
})();
