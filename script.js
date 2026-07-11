(() => {
  "use strict";

  // ---------- Rotating word in the badge ----------
  const words = ["Creator", "Programmer", "Developer", "Designer", "Engineer", "Builder", "Problem-Solver"];
  const wordEl = document.getElementById("rotating-word");
  let wordIdx = 0;
  setInterval(() => {
    wordEl.classList.add("swap");
    setTimeout(() => {
      wordIdx = (wordIdx + 1) % words.length;
      wordEl.textContent = words[wordIdx];
      wordEl.classList.remove("swap");
    }, 250);
  }, 2200);

  // ---------- Boot line typewriter ----------
  const homeBoot = document.getElementById("homeBootLine");
  if (homeBoot) {
    const bootText = "> welcome_home.sh --user=guest";
    let bi = 0;
    (function typeBoot() {
      if (bi <= bootText.length) {
        homeBoot.textContent = bootText.slice(0, bi);
        bi++;
        setTimeout(typeBoot, 24);
      }
    })();
  }

  // ---------- Occasional glitch pulse on the heading ----------
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    (function scheduleGlitch() {
      const delay = 3500 + Math.random() * 3000;
      setTimeout(() => {
        heroTitle.classList.add("glitch-pulse");
        setTimeout(() => heroTitle.classList.remove("glitch-pulse"), 400);
        scheduleGlitch();
      }, delay);
    })();
  }

  // ---------- Lanyard physics ----------
  const heroLeft = document.querySelector(".hero-left");
  const canvas = document.getElementById("ropeCanvas");
  const ctx = canvas.getContext("2d");
  const badge = document.getElementById("badge");

  const NUM_POINTS = 16;
  const GRAVITY = 0.9;
  const DAMPING = 0.985;
  const CONSTRAINT_ITERATIONS = 10;
  const BADGE_WIDTH = 280;

  let points = [];
  let segmentLength = 0;
  let anchorX = 0;
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;

  function getRect() {
    return heroLeft.getBoundingClientRect();
  }

  function resizeCanvas() {
    const rect = getRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    initRope(rect);
  }

  function initRope(rect) {
    anchorX = rect.width * 0.34;
    const restLength = rect.height * 0.52;
    segmentLength = restLength / (NUM_POINTS - 1);

    points = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const x = anchorX + Math.sin(i * 0.6) * 26; // gentle initial curve -> settles on load
      const y = i * segmentLength;
      points.push({ x, y, oldx: x - 4, oldy: y, pinned: i === 0 });
    }
  }

  function updatePhysics() {
    const last = points[points.length - 1];

    if (dragging) {
      const prevX = last.x;
      const prevY = last.y;
      last.x = pointerX;
      last.y = pointerY;
      last.oldx = prevX;
      last.oldy = prevY;
    }

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.pinned || (dragging && i === points.length - 1)) continue;
      const vx = (p.x - p.oldx) * DAMPING;
      const vy = (p.y - p.oldy) * DAMPING;
      p.oldx = p.x;
      p.oldy = p.y;
      p.x += vx;
      p.y += vy + GRAVITY;
    }

    for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        const diff = (dist - segmentLength) / dist;
        const offX = dx * 0.5 * diff;
        const offY = dy * 0.5 * diff;

        const p1Locked = p1.pinned;
        const p2Locked = p2.pinned || (dragging && i + 1 === points.length - 1);

        if (!p1Locked) { p1.x += offX; p1.y += offY; }
        if (!p2Locked) { p2.x -= offX; p2.y -= offY; }
      }
    }
  }

  let ribbonGradient = null;

  function render() {
    const rect = getRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (!ribbonGradient || ribbonGradient._h !== rect.height) {
      ribbonGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      ribbonGradient.addColorStop(0, "#7c6bff");
      ribbonGradient.addColorStop(1, "#00d4ff");
      ribbonGradient._h = rect.height;
    }

    // build smooth path through points
    const path = new Path2D();
    path.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const mx = (points[i].x + points[i + 1].x) / 2;
      const my = (points[i].y + points[i + 1].y) / 2;
      path.quadraticCurveTo(points[i].x, points[i].y, mx, my);
    }
    const lastPt = points[points.length - 1];
    path.lineTo(lastPt.x, lastPt.y);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = ribbonGradient;
    ctx.lineWidth = 22;
    ctx.stroke(path);

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 3;
    ctx.stroke(path);

    // position the badge DOM element at the end of the rope
    const prevPt = points[points.length - 2];
    const angle = Math.atan2(lastPt.x - prevPt.x, lastPt.y - prevPt.y) * (180 / Math.PI);
    const tx = lastPt.x - BADGE_WIDTH / 2;
    const ty = lastPt.y;
    badge.style.transform = `translate(${tx}px, ${ty}px) rotate(${angle}deg)`;

    if (!badge.classList.contains("ready")) badge.classList.add("ready");
  }

  function loop() {
    updatePhysics();
    render();
    requestAnimationFrame(loop);
  }

  // ---------- Drag interaction ----------
  function toLocalCoords(e) {
    const rect = getRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  const dragHint = document.getElementById("dragHint");

  badge.addEventListener("pointerdown", (e) => {
    dragging = true;
    const p = toLocalCoords(e);
    pointerX = p.x;
    pointerY = p.y;
    badge.setPointerCapture(e.pointerId);
    dragHint.classList.add("hidden");
  });

  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const p = toLocalCoords(e);
    pointerX = p.x;
    pointerY = p.y;
  });

  function endDrag() {
    dragging = false;
  }

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  // ---------- Boot ----------
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  });

  resizeCanvas();
  requestAnimationFrame(loop);
})();
