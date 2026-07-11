(() => {
  "use strict";

  // ---------- Boot line typewriter ----------
  const bootText = "> decrypting personnel_file.dat ...";
  const bootEl = document.getElementById("bootLine");
  let i = 0;
  function typeBoot() {
    if (i <= bootText.length) {
      bootEl.textContent = bootText.slice(0, i);
      i++;
      setTimeout(typeBoot, 28);
    }
  }
  typeBoot();

  // ---------- Reveal-on-scroll sections ----------
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  sections.forEach((el) => observer.observe(el));

  // ---------- Scroll-synced timeline progress ----------
  const timeline = document.getElementById("timeline");
  const progress = document.getElementById("timelineProgress");

  function updateTimelineProgress() {
    if (!timeline) return;
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const timelineDocTop = timeline.getBoundingClientRect().top + scrollY;

    // Progress starts a bit before the timeline enters view, and is guaranteed
    // to hit 100% exactly when the page is scrolled all the way to the bottom
    // (rather than requiring the whole section to scroll past the viewport,
    // which may never happen if there isn't much content after it).
    const start = timelineDocTop - vh * 0.5;
    const maxScroll = document.documentElement.scrollHeight - vh;
    const pct = Math.min(1, Math.max(0, (scrollY - start) / (maxScroll - start)));
    progress.style.height = (pct * 100) + "%";
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateTimelineProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener("resize", updateTimelineProgress);
  updateTimelineProgress();
})();
