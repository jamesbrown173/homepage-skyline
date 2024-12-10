import gsap from "gsap";

// custom cursor

const cursor = document.getElementById("circularcursor");

document.body.onmousemove = function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
};

const letters = [
  "d",
  "u",
  "b",
  "a",
  "i",
  "s",
  "k",
  "y",
  "l",
  "i2",
  "n",
  "e",
].map((letter, index) => ({
  element: document.getElementById(`letter-${letter}`),
  img: document.getElementById(`letter-${letter}`).querySelector("img"),
  index,
}));

const maxHeight = 970;
const minHeight = 320;
const range = maxHeight - minHeight;

// Add mousemove listener to the parent container instead of individual letters
document.addEventListener("mousemove", (event) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const activationThreshold = screenHeight * 0.64; // Animation starts at 64% of screen height

  // Only trigger animation when mouse is above the threshold
  if (event.clientY > activationThreshold) {
    return;
  }

  // Calculate vertical ratio for height based on mouse position
  // Map mouse position from [0, activationThreshold] to [minHeight, maxHeight]
  const newHeight =
    maxHeight - (event.clientY / activationThreshold) * (maxHeight - minHeight);

  // Calculate which letter should be the center based on mouse X position
  const letterWidth = screenWidth / letters.length;
  const centerLetterPosition = event.clientX / letterWidth;

  letters.forEach(({ img }, index) => {
    // Calculate distance from center letter (using decimal position for smoothness)
    const distance = Math.abs(index - centerLetterPosition);

    // Calculate intensity based on distance with smoother falloff
    const intensity = Math.max(0, 1 - distance * 0.15);

    // Use a smoother easing function and shorter duration
    gsap.to(img, {
      height: minHeight + (newHeight - minHeight) * intensity,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Reset all letters when mouse leaves the window
document.addEventListener("mouseleave", () => {
  letters.forEach(({ img }) => {
    gsap.to(img, {
      height: minHeight,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

document.addEventListener("mousemove", (e) => {
  const cursor = document.getElementById("invertedcursor");
  cursor.style.setProperty("--x", e.clientX + "px");
  cursor.style.setProperty("--y", e.clientY + "px");
});

// Add overlay code at the end of the file
const overlay = document.createElement("div");
overlay.classList.add("mobile-overlay");
overlay.innerHTML = `
  <div class="overlay-content">
    <h2>Please view on desktop</h2>
    <p>This experience is optimized for larger screens</p>
  </div>
`;
document.body.appendChild(overlay);

function handleOverlay() {
  const overlay = document.querySelector(".mobile-overlay");
  if (window.innerWidth < 900 || window.innerWidth > 1600) {
    overlay.style.display = "flex";

    // Update message based on screen size
    const message = overlay.querySelector("p");
    if (window.innerWidth < 900) {
      message.textContent = "This experience is optimized for larger screens";
    } else {
      message.textContent =
        "This experience is optimized for standard desktop screens";
    }
  } else {
    overlay.style.display = "none";
  }
}

// Check on load and resize
window.addEventListener("load", handleOverlay);
window.addEventListener("resize", handleOverlay);
