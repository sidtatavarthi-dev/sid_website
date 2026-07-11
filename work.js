(() => {
  "use strict";

  const projects = [
    {
      id: "nightowl",
      filename: "nightowl.txt",
      ext: "TXT",
      color: "#17c964",
      caseNo: "001",
      title: "Project Nightowl",
      status: "Shipped",
      statusClass: "shipped",
      details: "A browser extension that watches how long you've had DevTools open versus how long you've actually been coding. Surprisingly good at inducing guilt. Built with vanilla JS and a background service worker, because sometimes the boring tools are the right tools.",
      tags: ["Chrome Extension", "JavaScript", "Productivity"],
    },
    {
      id: "pixel",
      filename: "pixel.app",
      ext: "APP",
      color: "#f5a524",
      caseNo: "002",
      title: "Operation Pixel",
      status: "In Progress",
      statusClass: "progress",
      details: "A generative WebGL art piece where your cursor becomes a paintbrush for a field of drifting color gradients. Started as a weekend experiment in shaders and has slowly become an excuse to avoid finishing project #4 on this desktop.",
      tags: ["WebGL", "Generative Art", "Shaders"],
    },
    {
      id: "echo",
      filename: "echo_47.log",
      ext: "LOG",
      color: "#9195a0",
      caseNo: "047",
      title: "Case 47: Echo",
      status: "Archived",
      statusClass: "archived",
      details: "A minimal real-time chat app built to actually understand how end-to-end encryption handshakes work, instead of just trusting the library. Retired once it did its job — some cases you close on purpose.",
      tags: ["WebSockets", "Encryption", "Node.js"],
    },
    {
      id: "lantern",
      filename: "lantern.xlsx",
      ext: "XLS",
      color: "#17c964",
      caseNo: "012",
      title: "Project Lantern",
      status: "Shipped",
      statusClass: "shipped",
      details: "A personal finance dashboard that pulls in transactions and actually answers “where did my money go” with real charts instead of vibes. The most-used piece of software I've ever built for an audience of one.",
      tags: ["Dashboards", "Charts", "Personal Finance"],
    },
    {
      id: "signal",
      filename: "noise.locked",
      ext: "LOCK",
      color: "#f31260",
      caseNo: "099",
      title: "Signal / Noise",
      status: "Classified",
      statusClass: "classified",
      details: "A spam classifier trained on my own inbox that got a little too good — it now flags some of my own sent messages as suspicious. Filed under classified until I figure out what that says about me.",
      tags: ["Machine Learning", "Python", "Spam Detection"],
    },
    {
      id: "lanyard",
      filename: "lanyard.site",
      ext: "SITE",
      color: "#7c6bff",
      caseNo: "000",
      title: "The Lanyard Protocol",
      status: "Active",
      statusClass: "active",
      details: "A personal site with a physically-simulated ID badge on the home page, an evidence board that became a desktop, and a terminal that pretends to encrypt your emails. You're currently standing inside file #000.",
      tags: ["HTML/CSS/JS", "Physics", "Meta"],
      link: "index.html",
      linkLabel: "Return to home →",
    },
  ];

  const iconsContainer = document.getElementById("desktopIcons");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalFilename = document.getElementById("modalFilename");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function fileIconSVG() {
    return `
      <svg class="icon-glyph" viewBox="0 0 64 64">
        <path class="icon-body" d="M14 4 H40 L50 14 V60 H14 Z" />
        <path class="icon-fold" d="M40 4 V14 H50 Z" />
      </svg>
    `;
  }

  projects.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.className = "desktop-icon";
    btn.style.setProperty("--delay", (i * 0.08) + "s");
    btn.style.setProperty("--file-color", p.color);
    btn.innerHTML = `
      <div class="icon-glyph-wrap" style="--file-color:${p.color}">
        ${fileIconSVG()}
        <span class="icon-ext">${p.ext}</span>
      </div>
      <span class="icon-label">${p.filename}</span>
    `;
    btn.addEventListener("click", () => openProject(p, btn));
    iconsContainer.appendChild(btn);
  });

  function openProject(p, btn) {
    document.querySelectorAll(".desktop-icon.selected").forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");

    modalFilename.textContent = p.filename;
    modalBody.innerHTML = `
      <div class="modal-top">
        <div>
          <span class="modal-case">CASE NO. ${p.caseNo}</span>
          <h2>${p.title}</h2>
        </div>
        <span class="modal-status status-${p.statusClass}">${p.status}</span>
      </div>
      <div class="modal-preview">preview unavailable</div>
      <p class="modal-desc">${p.details}</p>
      <div class="modal-tags">${p.tags.map((t) => `<span class="modal-tag">${t}</span>`).join("")}</div>
      <a class="btn btn-primary" href="${p.link || "#"}" ${p.link === "index.html" ? "" : 'target="_blank" rel="noopener"'}>${p.linkLabel || "Open external link →"}</a>
    `;

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    document.querySelectorAll(".desktop-icon.selected").forEach((el) => el.classList.remove("selected"));
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ---------- Taskbar clock ----------
  const clockEl = document.getElementById("taskbarClock");
  function tick() {
    clockEl.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  tick();
  setInterval(tick, 1000);
})();
