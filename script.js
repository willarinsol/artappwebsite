const sets = [
  ["resources/1Final.png"],
  ["resources/Final2.png"],
  ["resources/3Final.png"],
  ["resources/Final4.png"],
  ["resources/Final5.png"],
  ["resources/Final6.png"],
  ["resources/Final7.png"],
];

const gallery = document.getElementById("gallery");
const counter = document.getElementById("counter");
const section = document.getElementById("scrollSection");
const carouselTrack = document.getElementById("carouselTrack");
const carouselSection = document.getElementById("carouselSection");

let currentSetIndex = -1;

// 1. Initialize Infinite Carousel
function initCarousel() {
  const allImages = sets.flat();
  // Create image elements from the data sets
  const imagesHTML = allImages
    .map((src) => `<img src="${src}" alt="Carousel item">`)
    .join("");

  // Duplicate images for a seamless infinite loop
  carouselTrack.innerHTML = imagesHTML + imagesHTML;

  // Fade in carousel on load
  setTimeout(() => {
    carouselSection.classList.add("visible");
  }, 100);
}

// 2. Intersection Observer for Carousel Disappearance
const carouselObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        carouselSection.classList.add("fade-out");
      } else {
        carouselSection.classList.remove("fade-out");
      }
    });
  },
  { threshold: 0.1 },
);

carouselObserver.observe(carouselSection);

// 3. Render Scroll Gallery Sets
function render(index) {
  if (index === currentSetIndex) return;
  currentSetIndex = index;

  gallery.innerHTML = "";
  sets[index].forEach((src, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url(${src})`;
    gallery.appendChild(card);

    // Staggered entry animation
    setTimeout(() => card.classList.add("show"), 100 * i);
  });

  counter.textContent = `SCENE ${index + 1} / ${sets.length}`;
}

// 4. Scroll Logic
window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const totalHeight = section.offsetHeight - window.innerHeight;

  // Calculate scroll progress (0 to 1)
  let progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);

  // Map progress to the current image set
  let index = Math.min(sets.length - 1, Math.floor(progress * sets.length));

  render(index);
});

const backToTopBtn = document.getElementById("backToTop");

// 5. Back to Top Logic
window.addEventListener("scroll", () => {
  // Show button after scrolling down 400px
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }

  // --- Keep your existing scroll gallery logic here ---
  const rect = section.getBoundingClientRect();
  const totalHeight = section.offsetHeight - window.innerHeight;
  let progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
  let index = Math.min(sets.length - 1, Math.floor(progress * sets.length));
  render(index);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Initialize on page load
initCarousel();
render(0);
