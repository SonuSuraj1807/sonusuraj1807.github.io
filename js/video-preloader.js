/* STUNNING PRELOADER + INTRO SCREEN LOGIC */
(function () {
  console.log('Stunning preloader script loaded');

  // Elements
  const introScreen = document.getElementById('intro-screen');
  const viewPortfolioBtn = document.getElementById('view-portfolio-btn');
  const stunningPreloader = document.getElementById('stunning-preloader');
  const preloaderSparkles = document.getElementById('preloader-sparkles');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderMainContent = document.querySelector('.preloader-main-content');
  const welcomeMessage = document.getElementById('preloader-welcome-message');

  console.log('Elements found:', { introScreen, viewPortfolioBtn, stunningPreloader });

  // Create sparkle particles
  function createSparkles() {
    if (!preloaderSparkles) return;
    for (let i = 0; i < 40; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'preloader-sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 2 + 's';
      sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
      sparkle.style.width = (Math.random() * 3 + 2) + 'px';
      sparkle.style.height = sparkle.style.width;
      preloaderSparkles.appendChild(sparkle);
    }
  }

  // Function to reveal portfolio after preloader
  function revealPortfolio() {
    // Remove loading class to show main content
    document.body.classList.remove('loading');

    // Add hero-visible class to show hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.classList.add('hero-visible');
    }

    // Trigger hero animation (typing effect)
    document.dispatchEvent(new Event('StartHero'));
  }

  // Animate percentage counter
  function animateProgress() {
    let percent = 0;
    const duration = 3500; // 3.5 seconds
    const startTime = Date.now() + 1300; // Start after animations begin

    function updatePercent() {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(updatePercent);
        return;
      }

      percent = Math.min(100, Math.floor((elapsed / duration) * 100));
      if (preloaderPercent) {
        preloaderPercent.textContent = percent + '%';
      }

      if (percent < 100) {
        requestAnimationFrame(updatePercent);
      } else {
        // Loading complete - show welcome message
        setTimeout(() => {
          if (preloaderMainContent) {
            preloaderMainContent.style.opacity = '0';
          }
          setTimeout(() => {
            if (welcomeMessage) {
              welcomeMessage.classList.add('show');
            }
            // After welcome message, fade out and show portfolio
            setTimeout(() => {
              if (stunningPreloader) {
                stunningPreloader.classList.add('fade-out');
              }
              setTimeout(() => {
                if (stunningPreloader) {
                  stunningPreloader.style.display = 'none';
                }
                // Reveal the portfolio
                revealPortfolio();
              }, 1500);
            }, 1500); // Show welcome message for 1.5 seconds
          }, 500);
        }, 300);
      }
    }

    updatePercent();
  }

  // Handle View Portfolio button click
  if (viewPortfolioBtn) {
    viewPortfolioBtn.addEventListener('click', function () {
      console.log('View Portfolio button clicked');

      // IMMEDIATELY show the preloader BEFORE fading out intro
      if (stunningPreloader) {
        stunningPreloader.classList.add('active');
        createSparkles();
      }

      // Start intro fade out
      introScreen.classList.add('fade-out');

      // Start progress animation immediately
      animateProgress();

      // Hide intro screen after fade completes
      setTimeout(() => {
        if (introScreen) {
          introScreen.style.display = 'none';
        }
      }, 1000);
    });
  }

  // Error handling for missing elements
  if (!introScreen || !stunningPreloader) {
    console.error('Missing preloader or intro elements');
    if (stunningPreloader) stunningPreloader.style.display = 'none';
    if (introScreen) introScreen.style.display = 'none';
    document.body.classList.remove('loading');
    // Still reveal portfolio if elements are missing
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.classList.add('hero-visible');
    }
    return;
  }
})();
