const scenes = [
  {
    img: "resources/1Final.png",
    title: "Chapter One",
    desc: "This is where it all began. A simple moment that led to something beautiful.",
  },
  {
    img: "resources/Final2.png",
    title: "Growing Together",
    desc: "Learning about each other more and more as the days go by.",
  },
  {
    img: "resources/3Final.png",
    title: "Shared Dreams",
    desc: "Building a foundation for the future we want to create side by side.",
  },
  {
    img: "resources/Final4.png",
    title: "Support System",
    desc: "Through every high and low, we remain each other's greatest strength.",
  },
  {
    img: "resources/Final5.png",
    title: "New Adventures",
    desc: "Exploring the world and discovering new reasons to smile every day.",
  },
  {
    img: "resources/Final6.png",
    title: "Unbreakable Bond",
    desc: "It's the small, quiet moments that mean the absolute most.",
  },
  {
    img: "resources/Final7.png",
    title: "Our Forever",
    desc: "The story doesn't end here; in fact, the best is yet to come.",
  },
];

const storyContainer = document.getElementById("storyContainer");
const counter = document.getElementById("counter");
const section = document.getElementById("scrollSection");
const carouselTrack = document.getElementById("carouselTrack");
const carouselSection = document.getElementById("carouselSection");
const backToTopBtn = document.getElementById("backToTop");

let currentIdx = -1;

// Initialize Carousel
function initCarousel() {
  const imagesHTML = scenes
    .map((s) => `<img src="${s.img}" alt="Carousel">`)
    .join("");
  carouselTrack.innerHTML = imagesHTML + imagesHTML;
  setTimeout(() => carouselSection.classList.add("visible"), 100);
}

// Update Gallery State
function updateGallery(index, internalProgress) {
  // 0.0 - 0.3: Big Picture Incoming
  // 0.3 - 0.7: Side-by-Side (Active Text)
  // 0.7 - 1.0: Exit (Preparation for next)
  const isSideState = internalProgress > 0.3 && internalProgress <= 0.7;
  const isExitState = internalProgress > 0.7;

  // Swap content only if index changes
  if (index !== currentIdx) {
    currentIdx = index;
    const data = scenes[index];

    // Smooth fade the inner container during the swap
    storyContainer.style.opacity = "0";

    setTimeout(() => {
      storyContainer.innerHTML = `
        <div class="image-wrapper">
          <img src="${data.img}" alt="Story Image">
        </div>
        <div class="text-card">
          <h2>${data.title}</h2>
          <p>${data.desc}</p>
        </div>
      `;
      storyContainer.style.opacity = "1";
    }, 50);
  }

  // Handle CSS Class State Toggles
  if (isSideState) {
    storyContainer.classList.add("state-side");
    storyContainer.classList.remove("state-exit");
  } else if (isExitState) {
    storyContainer.classList.remove("state-side");
    storyContainer.classList.add("state-exit");
  } else {
    storyContainer.classList.remove("state-side");
    storyContainer.classList.remove("state-exit");
  }

  counter.textContent = `SCENE ${index + 1} / ${scenes.length}`;
}

// Scroll Event Listener
window.addEventListener("scroll", () => {
  // Back to Top & Carousel Fade
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
    carouselSection.classList.add("fade-out");
  } else {
    backToTopBtn.classList.remove("show");
    carouselSection.classList.remove("fade-out");
  }

  // Calculate Scene Progress
  const rect = section.getBoundingClientRect();
  const totalHeight = section.offsetHeight - window.innerHeight;
  let progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);

  let sceneTotal = progress * scenes.length;
  let index = Math.min(scenes.length - 1, Math.floor(sceneTotal));
  let internalProgress = sceneTotal % 1;

  updateGallery(index, internalProgress);
});

// Back to Top functionality
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Start the page
initCarousel();
updateGallery(0, 0);
