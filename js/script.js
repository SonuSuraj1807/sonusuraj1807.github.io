/* ======================================================
   DYNAMIC CONTENT RENDERING
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderEducation();
  renderProjects();
  renderSkills();
  renderInternships();
  renderCertifications();

  // Re-initialize animations after content is injected
  initScrollAnimations();
  initSideNav();
  initTheme();
  initBackToTop();
  initCertModal();
});

function renderEducation() {
  const container = document.getElementById("education-container");
  if (!container || !window.portfolioData) return;
  let html = "";
  window.portfolioData.education.forEach(edu => {
    html += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content edu-card">
          <h3>${edu.title}</h3>
          <span>${edu.year}</span>
          <p>${edu.description}</p>
          ${edu.grade ? `<p><strong>${edu.grade}</strong></p>` : ""}
        </div>
      </div>
    `;
  });
  html += '<div class="timeline-end-cap"></div>';
  container.innerHTML = html;
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || !window.portfolioData) return;
  let html = "";
  window.portfolioData.projects.forEach(project => {
    const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join("");
    html += `
      <div class="project-card fade-up">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${tagsHtml}</div>
        <div class="project-links">
          <a href="${project.link}" target="_blank">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container || !window.portfolioData) return;
  let html = "";
  window.portfolioData.skills.forEach(skill => {
    html += `
      <div class="skill-item">
        <div class="skill-header">
          <i class="${skill.icon}" style="color: ${skill.color}; margin-right: 8px;"></i>
          <span class="skill-name">${skill.name}</span>
        </div>
        <div class="bar">
          <span data-level="${skill.level}">
            <em>${skill.levelText}</em>
          </span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  // Trigger skill bar animation after a short delay to ensure DOM is ready
  setTimeout(initSkillsAnimation, 100);
}

function renderInternships() {
  const container = document.getElementById("internships-container");
  if (!container || !window.portfolioData) return;
  let html = "";
  window.portfolioData.internships.forEach(intern => {
    html += `
      <div class="intern-card">
        <h3>
          ${intern.title}
          <span class="intern-icons">
            <i class="${intern.icon}" title="${intern.iconTitle}"></i>
          </span>
        </h3>
        <p class="company">${intern.company}</p>
        <span class="duration">${intern.duration}</span>
        <p class="desc">${intern.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderCertifications() {
  const container = document.getElementById("certifications-container");
  if (!container || !window.portfolioData) return;
  let html = "";
  window.portfolioData.certifications.forEach(cert => {
    html += `
      <div class="cert-card fade-up">
        <div class="cert-image">
          <img src="${cert.image}" alt="${cert.title}">
        </div>
        <div class="cert-info">
          <h3>${cert.title}</h3>
          <p class="issuer">Issued by ${cert.issuer}</p>
          <span class="date">${cert.issueDate}</span>
        </div>
        <div class="cert-actions">
           ${cert.pdf ? `<button class="view-cert" data-pdf="${cert.pdf}"><i class="fas fa-file-pdf"></i> View PDF</button>` : ""}
           <button class="view-cert" data-pdf="${cert.image}"><i class="fas fa-certificate"></i> View Certificate</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  // Re-initialize modal buttons after injection
  initCertModal();
}

/* ======================================================
   SCI-FI PRELOADER LOGIC
====================================================== */
// Redundant preloader logic removed. Functionality handled by video-preloader.js.

function startHeroAnimation() {
  document.dispatchEvent(new Event("StartHero"));
}

/* ======================================================
   HERO TYPING SEQUENCER
====================================================== */
document.addEventListener("StartHero", () => {
  const h1 = document.getElementById("type-h1");
  const h2 = document.getElementById("type-h2");
  const desc = document.getElementById("type-desc");

  if (!h1 || !h2 || !desc) return;

  const textH1 = "Hi, I'm Suraj Rao";
  const textH2 = "A Data Science Student";
  const textDesc = "From Vignana Bharathi Institute of Technology, Hyderabad, Telangana, India. Building intelligent solutions using data, analytics, and modern technologies.";

  function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = "";
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) callback();
    }
    type();
  }

  setTimeout(() => {
    typeText(h1, textH1, 75, () => {
      typeText(h2, textH2, 40, () => {
        typeText(desc, textDesc, 20, () => {
          const staggerItems = [
            ...document.querySelectorAll('.hero-tags span'),
            document.querySelector('.connect-label'),
            ...document.querySelectorAll('.social-bar a')
          ];
          staggerItems.forEach((item, index) => {
            if (item) {
              setTimeout(() => {
                item.classList.remove('hidden');
                item.classList.add('pop-in');
              }, index * 100);
            }
          });
          initScrollAnimations();
        });
      });
    });
  }, 200);
});

/* ======================================================
   THEME TOGGLE
====================================================== */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
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
   SKILLS BAR ANIMATION - CONTINUOUS
====================================================== */
function initSkillsAnimation() {
  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;
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
        } else {
          // Reset bars when out of view for re-animation
          const bars = entry.target.querySelectorAll(".bar span");
          bars.forEach(bar => {
            bar.style.width = "0%";
            bar.classList.remove("filled");
          });
        }
      });
    },
    { threshold: 0.1 }
  );
  skillObserver.observe(skillsSection);
}

/* ======================================================
   FADE-UP SECTIONS & TITLE ANIMATIONS - CONTINUOUS
====================================================== */
function initScrollAnimations() {
  // Animate section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  const titleObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use RAF for smooth animation trigger
          requestAnimationFrame(() => {
            entry.target.classList.add("animate-in");
          });
        } else {
          // Remove class when out of view for re-animation
          entry.target.classList.remove("animate-in");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-50px"
    }
  );

  sectionTitles.forEach(title => titleObserver.observe(title));

  // Animate fade-up elements
  const fadeElements = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use RAF for smooth animation trigger
          requestAnimationFrame(() => {
            entry.target.classList.add("visible");
          });
        } else {
          // Remove class when out of view for re-animation
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-30px"
    }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));
}

/* ======================================================
   SIDE NAV
====================================================== */
function initSideNav() {
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
}

/* ======================================================
   BACK TO TOP
====================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) backToTopBtn.classList.add("show");
    else backToTopBtn.classList.remove("show");
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ======================================================
   CERTIFICATE VIEWER
====================================================== */
function initCertModal() {
  const modal = document.getElementById("certModal");
  const modalContent = document.querySelector(".cert-modal-content");
  if (!modal || !modalContent) return;
  const closeBtn = modal.querySelector(".cert-close");

  document.querySelectorAll(".view-cert").forEach(btn => {
    btn.addEventListener("click", () => {
      const file = btn.dataset.pdf;
      if (!file) return;
      const isPdf = file.toLowerCase().endsWith('.pdf');

      // Clear existing content
      const existingIframe = document.getElementById("certFrame");
      if (existingIframe) existingIframe.remove();
      const existingImg = modalContent.querySelector('.cert-modal-img');
      if (existingImg) existingImg.remove();

      if (isPdf) {
        const iframe = document.createElement('iframe');
        iframe.id = "certFrame";
        iframe.src = file;
        modalContent.appendChild(iframe);
      } else {
        const img = document.createElement('img');
        img.className = "cert-modal-img";
        img.src = file;
        img.alt = "Certificate";
        modalContent.appendChild(img);
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    // Clear content on close to ensure the frame collapses
    const existingIframe = document.getElementById("certFrame");
    if (existingIframe) existingIframe.remove();
    const existingImg = modalContent.querySelector('.cert-modal-img');
    if (existingImg) existingImg.remove();
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}
