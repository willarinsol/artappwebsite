const scenes = [
  {
    img: "resources/1Final.png",
    title: "Empty Canvas",
    desc: "He sat like a forgotten painting, washed in shades of black and white, where time moved but nothing truly lived. The world around him was winter; cold, and silent while his heart remained a garden that had never learned how to bloom. Behind his eyes was a quiet ache for something unseen, something beyond the gray horizon. He did not know that soon, someone would arrive like spring, carrying colors in her hands and life in her footsteps.",
  },
  {
    img: "resources/Final2.png",
    title: "Slipping Sunlight",
    desc: "While he remained rooted in a world of shadows, she passed beside him like sunlight slipping through a storm. She walked into the frame of his life like the first brushstroke on an empty canvas. Though she was only a stranger in that fleeting moment, Without a word, she became the first sign that even the darkest winters can make room for spring.",
  },
  {
    img: "resources/3Final.png",
    title: "Fallen Spark",
    desc: "As she passed like a sunlight, a small piece of her world fell to the ground. Against the endless gray, it shined like a flame in the dark. What seemed like an accident was,  fate’s quiet invitation; a fragment of color placed within his reach. In that fallen object lay the first thread connecting two strangers, proving that even the smallest moments can alter the course of one's life.",
  },
  {
    img: "resources/Final4.png",
    title: "Focal Vision",
    desc: "From his place in the shadows, he watched her sat like a fallen star upon the gray pavement. As he stare in her, the air between them began to hum with a vibrance that resists the surrounding silence. Her radiance served as a silent invitation, spilling across the cold ground and painting a path of color directly to his feet. He sat at the edge of his monochrome life, staring at the bridge of light that was slowly erasing the distance between them.",
  },
  {
    img: "resources/Final5.png",
    title: "Bridge",
    desc: "He reached across the silent to return the fallen light, his hand finally closing the distance between them. As they met, a sudden warmth bled from the tips of his fingers, dissolving the winter of his skin at the first touch. For the first time, he was no longer just a spectator of the spring; he was becoming the very canvas where it chose to bloom.",
  },
  {
    img: "resources/Final6.png",
    title: "Shared Frequency",
    desc: "She leaned in to share a piece of her world, a gesture that finally silenced the static of his gray isolation. At her touch, the melody of color didn't just whisper; it roared through his senses. The dark landscape around them finally surrendered to her radiance, shedding its gray coat to reveal a vibrant, a sanctuary. In the tilt of their heads, he realized that he wasn't just observing her spectrum anymore, he was finally vibrating at the same frequency.",
  },
  {
    img: "resources/Final7.png",
    title: "Bloom behind his Eyes",
    desc: "The winter that once clouded his vision had finally retreated, leaving behind a gaze that was wide and wonder-filled. Within the mirror of his eye, the world no longer sat in shadows, but shimmered with the vibrant life they now shared together. He realized that the quiet ache in his chest had been replaced by a garden that had finally bloomed, vibrant and full of life. As they stay by each other's side, the colors she brought remained rooted within him, ensuring he would never have to see in gray ",
  },
];

const storyContainer = document.getElementById("storyContainer");
const counter = document.getElementById("counter");
const section = document.getElementById("scrollSection");
const carouselTrack = document.getElementById("carouselTrack");
const carouselSection = document.getElementById("carouselSection");
const backToTopBtn = document.getElementById("backToTop");

let currentIdx = -1;

function initCarousel() {
  const imagesHTML = scenes
    .map((s) => `<img src="${s.img}" alt="Carousel">`)
    .join("");
  carouselTrack.innerHTML = imagesHTML + imagesHTML;
  setTimeout(() => carouselSection.classList.add("visible"), 100);
}

function updateGallery(index, internalProgress) {
  // 0.0 - 0.2: Sliding In from bottom
  // 0.2 - 0.4: Big Picture (Active)
  // 0.4 - 0.8: Side-by-Side (Active)
  // 0.8 - 1.0: Sliding Out to top

  const isActive = internalProgress > 0.05 && internalProgress <= 0.8;
  const isSideState = internalProgress > 0.4 && internalProgress <= 0.8;
  const isExitState = internalProgress > 0.8;

  if (index !== currentIdx) {
    currentIdx = index;
    const data = scenes[index];

    // Instant clear for the slide transition
    storyContainer.innerHTML = `
      <div class="image-wrapper">
        <img src="${data.img}" alt="Story Image">
      </div>
      <div class="text-card">
        <h2>${data.title}</h2>
        <p>${data.desc}</p>
      </div>
    `;
  }

  // Handle CSS Class States
  if (isActive) {
    storyContainer.classList.add("active");
  } else {
    storyContainer.classList.remove("active");
  }

  if (isSideState) {
    storyContainer.classList.add("state-side");
  } else {
    storyContainer.classList.remove("state-side");
  }

  if (isExitState) {
    storyContainer.classList.add("state-exit");
    storyContainer.classList.remove("active");
  } else {
    storyContainer.classList.remove("state-exit");
  }

  counter.textContent = `SCENE ${index + 1} / ${scenes.length}`;
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
    carouselSection.classList.add("fade-out");
  } else {
    backToTopBtn.classList.remove("show");
    carouselSection.classList.remove("fade-out");
  }

  const rect = section.getBoundingClientRect();
  const totalHeight = section.offsetHeight - window.innerHeight;
  let progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);

  let sceneTotal = progress * scenes.length;
  let index = Math.min(scenes.length - 1, Math.floor(sceneTotal));
  let internalProgress = sceneTotal % 1;

  updateGallery(index, internalProgress);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

initCarousel();
updateGallery(0, 0);
