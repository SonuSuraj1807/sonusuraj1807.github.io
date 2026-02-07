/* ======================================================
   SCI-FI PRELOADER LOGIC
====================================================== */
window.addEventListener("load", () => {
  // Don't remove loading class here - let the intro/preloader flow handle it
  // document.body.classList.remove("loading");

  const preloader = document.getElementById("preloader");
  const codeContainer = document.querySelector(".code-container");
  const progressFill = document.querySelector(".progress-fill");
  const statusBox = document.querySelector(".status-box span");

  // Random code generator for realistic effect
  const codeTemplates = [
    "from sklearn.model_selection import train_test_split",
    "import numpy as np",
    "import pandas as pd",
    "def process_data(X, y):",
    "  return model.fit(X, y)",
    "class DataLoader:",
    "  def __init__(self, batch_size):",
    "    self.batch = batch_size",
    "while (--i >= 0) {",
    "  free(group_info->blocks[i]);",
    "}",
    "return NULL;",
    "EXPORT_SYMBOL(groups_alloc);",
    "kfree(group_info);",
    "for (i = 0; i < nblocks; i++) {",
    "  group_info->blocks[i] = kmalloc(size, GFP_KERNEL);",
  ];

  function generateRandomCode() {
    const randomLines = [];
    for (let i = 0; i < 100; i++) {
      const template = codeTemplates[Math.floor(Math.random() * codeTemplates.length)];
      const hexAddr = `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`;
      randomLines.push(`${hexAddr}: ${template}`);
    }
    return randomLines;
  }

  const codeSnippets = generateRandomCode();

  if (preloader && codeContainer) {
    let i = 0;

    // CHAOTIC DATA TORRENT (Fast Interval)
    const interval = setInterval(() => {
      // Endless scrolling simulation
      if (i >= codeSnippets.length) i = 0; // Loop the code for density

      const line = document.createElement("div");
      line.className = "code-line";
      // Add random memory address for realism
      const memAddr = `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`;
      line.innerHTML = `<span style="color:#0055aa">${memAddr}</span>: ${codeSnippets[i]}`;
      codeContainer.appendChild(line);

      // Auto scroll to bottom (keep DOM light)
      if (codeContainer.childElementCount > 50) {
        codeContainer.removeChild(codeContainer.firstChild);
      }
      codeContainer.scrollTop = codeContainer.scrollHeight;

    }, 35); // 35ms = Very fast

    // Progress Bar Logic (Decoupled from code stream)
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 1;
      if (progress > 100) {
        clearInterval(progressInterval);
        clearInterval(interval); // Stop code stream

        if (statusBox) statusBox.textContent = "SYSTEM READY";

        // Final fade out
        setTimeout(() => {
          preloader.classList.add("fade-out");
          setTimeout(() => {
            preloader.style.display = "none";
            startHeroAnimation();
          }, 500);
        }, 600);
      } else {
        if (progressFill) progressFill.style.width = `${progress}%`;
        const percentText = document.querySelector(".percent-text");
        if (percentText) percentText.textContent = `${progress}%`;
      }
    }, 30); // 30ms * 100 = 3 seconds total load

  }
  /* 
     REMOVED: Fallback startHeroAnimation() 
     This was causing the typing animation to run immediately because #preloader 
     (old ID) is missing. Now animation waits for #stunning-preloader event.
  */
  // else {
  //   startHeroAnimation();
  // }
});

// Wrapper to start Hero animation only after loader
function startHeroAnimation() {
  document.dispatchEvent(new Event("StartHero"));
}

/* ======================================================
   HERO TYPING SEQUENCER (FULL TEXT)
====================================================== */
// Listens for custom event triggered by Preloader
document.addEventListener("StartHero", () => {
  const h1 = document.getElementById("type-h1");
  const h2 = document.getElementById("type-h2");
  const desc = document.getElementById("type-desc");
  const fadeEls = document.querySelectorAll(".fade-after");

  // Safety check
  if (!h1 || !h2 || !desc) return;

  // Text content to type
  const textH1 = "Hi, I'm Suraj Rao";
  const textH2 = "A Data Science Student";
  const textDesc = "From Vignana Bharathi Institute of Technology, Hyderabad, Telangana, India. Building intelligent solutions using data, analytics, and modern technologies.";

  // Typewriter Helper Function
  function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = ""; // Clear initial content

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  // Start the Sequence (Staggered)
  setTimeout(() => {
    // 1. Type Title (Name)
    typeText(h1, textH1, 75, () => {

      // 2. Type Subtitle
      typeText(h2, textH2, 40, () => {

        // 3. Type Description
        typeText(desc, textDesc, 20, () => {

          // 4. Staggered Fade-in for Tags & Socials

          // Unhide containers first? NO, let pop-in handle visibility
          // fadeEls.forEach(el => el.classList.remove('hidden'));

          // Collect all individual items to animate
          const staggerItems = [
            ...document.querySelectorAll('.hero-tags span'),
            document.querySelector('.connect-label'),
            ...document.querySelectorAll('.social-bar a')
          ];

          // Apply pop-in class with increasing delay
          staggerItems.forEach((item, index) => {
            if (item) {
              setTimeout(() => {
                // Ensure hidden class is removed or overridden by animation
                item.classList.remove('hidden');
                item.classList.add('pop-in');
              }, index * 100); // 100ms delay between each item
            }
          });


          // Initialize scroll animations for other sections now that main content is visible
          initScrollAnimations();

        });
      });
    });
  }, 200); // Short delay after loader finishes
});

/* ======================================================
   THEME TOGGLE (WITH MEMORY)
====================================================== */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.innerHTML = "☀";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = "☀";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = "☾";
    }
  });
}

/* ======================================================
   SKILLS BAR ANIMATION
====================================================== */
const skillsSection = document.querySelector("#skills");

if (skillsSection) {
  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".bar span");

          bars.forEach(bar => {
            const level = bar.getAttribute("data-level");
            bar.style.width = level;
            bar.classList.add("filled");
          });

          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillObserver.observe(skillsSection);
}

/* ======================================================
   FADE-UP SECTIONS ON SCROLL
====================================================== */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeElements.forEach(el => fadeObserver.observe(el));
}

// Call inside StartHero or verify if redundant
// (We will add the call inside the StartHero listener below)

/* ======================================================
   SIDE NAV ACTIVE LINK
====================================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".side-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ======================================================
   SMOOTH SCROLL (CUSTOM EASING)
====================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const offset = 90;
    const targetPosition = target.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 700;
    let start = null;

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  });
});

/* ======================================================
   SCROLL PROGRESS BAR
====================================================== */
const progressBar = document.getElementById("scroll-progress");

if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

/* ======================================================
   HERO IMAGE PARALLAX
====================================================== */
const heroImage = document.querySelector(".hero-image img");

window.addEventListener("mousemove", e => {
  if (!heroImage) return;

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
});

/* ======================================================
   CERTIFICATE VIEWER MODAL
====================================================== */
const modal = document.getElementById("certModal");
const iframe = document.getElementById("certFrame");
const closeBtn = modal.querySelector(".cert-close");

if (modal && closeBtn) {
  document.querySelectorAll(".view-cert").forEach(btn => {
    btn.addEventListener("click", () => {
      iframe.src = btn.dataset.pdf;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    iframe.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);

  // click outside modal
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  // ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ======================================================
   BACK TO TOP BUTTON LOGIC
====================================================== */
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
