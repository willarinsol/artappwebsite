const scenes = [
  {
    img: "resources/1Final.png",
    title: "The Start",
    desc: "This is our first big moment together. Scroll more to see the story.",
  },
  {
    img: "resources/Final2.png",
    title: "Growing",
    desc: "We started learning more about each other every single day.",
  },
  {
    img: "resources/3Final.png",
    title: "Adventure",
    desc: "Exploring new places and creating memories that last forever.",
  },
  {
    img: "resources/Final4.png",
    title: "Support",
    desc: "Always being there for one another, through thick and thin.",
  },
  {
    img: "resources/Final5.png",
    title: "Laughter",
    desc: "Because every day is better when we are laughing together.",
  },
  {
    img: "resources/Final6.png",
    title: "Unity",
    desc: "Two individuals becoming one unstoppable team.",
  },
  {
    img: "resources/Final7.png",
    title: "Forever",
    desc: "The journey continues, and the best is yet to come.",
  },
];

const storyContainer = document.getElementById("storyContainer");
const counter = document.getElementById("counter");
const section = document.getElementById("scrollSection");
const carouselTrack = document.getElementById("carouselTrack");
const carouselSection = document.getElementById("carouselSection");
const backToTopBtn = document.getElementById("backToTop");

let currentIdx = -1;
let currentState = ""; // "big" or "side"

function initCarousel() {
  const imagesHTML = scenes.map((s) => `<img src="${s.img}">`).join("");
  carouselTrack.innerHTML = imagesHTML + imagesHTML;
}

function updateGallery(index, isSideState) {
  // Only re-render HTML if we switch images
  if (index !== currentIdx) {
    currentIdx = index;
    const data = scenes[index];
    storyContainer.innerHTML = `
      <div class="image-wrapper">
        <img src="${data.img}" alt="Story">
      </div>
      <div class="text-card">
        <h2>${data.title}</h2>
        <p>${data.desc}</p>
      </div>
    `;
  }

  // Toggle classes for the transition
  if (isSideState) {
    storyContainer.classList.add("state-side");
  } else {
    storyContainer.classList.remove("state-side");
  }

  counter.textContent = `SCENE ${index + 1} / ${scenes.length}`;
}

window.addEventListener("scroll", () => {
  // Back to Top & Carousel Fade
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
    carouselSection.classList.add("fade-out");
  } else {
    backToTopBtn.classList.remove("show");
    carouselSection.classList.remove("fade-out");
  }

  // Scroll Calculation
  const rect = section.getBoundingClientRect();
  const totalHeight = section.offsetHeight - window.innerHeight;
  let progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);

  // Determine which scene we are in
  let sceneProgress = progress * scenes.length;
  let index = Math.min(scenes.length - 1, Math.floor(sceneProgress));

  // Determine if we are in the first half (Big) or second half (Side) of the current scene
  let internalProgress = sceneProgress % 1;
  let isSideState = internalProgress > 0.5;

  updateGallery(index, isSideState);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

initCarousel();
updateGallery(0, false);
