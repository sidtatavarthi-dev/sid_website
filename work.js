(() => {
  "use strict";

  const projects = [
    {
      id: "objectdetection",
      filename: "object_detection.py",
      ext: "PY",
      color: "#17c964",
      caseNo: "001",
      title: "Object Detection",
      status: "Shipped",
      statusClass: "shipped",
      details: "A real-time object detection system that finds and classifies objects from a webcam or video feed, drawing bounding boxes and labels as it goes. Built with OpenCV and a YOLO/TensorFlow model under the hood.",
      tags: ["Python", "OpenCV", "TensorFlow"],
      link: "https://github.com/sidtatavarthi-dev/ObjectDetection",
      linkLabel: "View source on GitHub →",
      preview: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 30 V15 H30" /><path d="M70 15 H85 V30" />
        <path d="M85 70 V85 H70" /><path d="M30 85 H15 V70" />
        <circle cx="50" cy="50" r="14" />
      </svg>`,
    },
    {
      id: "jarvis",
      filename: "jarvis.exe",
      ext: "EXE",
      color: "#7c6bff",
      caseNo: "002",
      title: "Jarvis Assistant",
      status: "Active",
      statusClass: "active",
      details: "A voice-controlled desktop assistant for Windows — say “Jarvis” and it opens your go-to sites, controls system volume and brightness, manages browser tabs, and talks back via text-to-speech.",
      tags: ["Python", "Speech Recognition", "Automation"],
      link: "https://github.com/sidtatavarthi-dev/JarvisAssistant",
      linkLabel: "View source on GitHub →",
      preview: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="40" y="18" width="20" height="40" rx="10" />
        <path d="M28 48 a22 22 0 0 0 44 0" />
        <path d="M50 70 V85" /><path d="M35 85 H65" />
      </svg>`,
    },
    {
      id: "phonedetector",
      filename: "phone_detector.py",
      ext: "PY",
      color: "#17c964",
      caseNo: "003",
      title: "Phone Detector",
      status: "Shipped",
      statusClass: "shipped",
      details: "A computer vision system that watches your head tilt through the webcam and flags when you're probably looking down at your phone, with a real-time visual notification.",
      tags: ["Python", "OpenCV", "MediaPipe"],
      link: "https://github.com/sidtatavarthi-dev/PhoneDetector",
      linkLabel: "View source on GitHub →",
      preview: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="32" y="12" width="36" height="76" rx="8" />
        <path d="M46 80 H54" />
        <path d="M18 50 H30" stroke-dasharray="4 6" /><path d="M70 50 H82" stroke-dasharray="4 6" />
      </svg>`,
    },
    {
      id: "gesturechess",
      filename: "gesture_chess.py",
      ext: "PY",
      color: "#f5a524",
      caseNo: "004",
      title: "Gesture Chess",
      status: "In Progress",
      statusClass: "progress",
      details: "A full chess game you play by pointing and pinching at pieces on a webcam feed instead of clicking. Hand-tracking via MediaPipe, board logic via python-chess, rendered with Pygame.",
      tags: ["Python", "MediaPipe", "Pygame"],
      link: "https://github.com/sidtatavarthi-dev/gesture-chess",
      linkLabel: "View source on GitHub →",
      preview: `<svg viewBox="0 0 100 110" fill="currentColor">
        <circle cx="50" cy="22" r="14" />
        <rect x="44" y="36" width="12" height="8" rx="2" />
        <path d="M33 50 C33 62 43 63 43 74 C43 84 30 85 28 96 L72 96 C70 85 57 84 57 74 C57 63 67 62 67 50 C67 44 61 42 50 42 C39 42 33 44 33 50 Z" />
        <rect x="22" y="96" width="56" height="10" rx="4" />
      </svg>`,
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
      preview: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M42 8 V20" /><path d="M58 8 V20" />
        <rect x="30" y="20" width="40" height="10" rx="3" />
        <rect x="26" y="34" width="48" height="54" rx="6" />
        <circle cx="50" cy="53" r="8" />
        <path d="M40 76 H60" />
      </svg>`,
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
      <div class="modal-preview" style="--file-color:${p.color}">${p.preview || ""}</div>
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
