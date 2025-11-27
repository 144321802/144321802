document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".design-img");
  const popupOverlay = document.getElementById("popup-overlay");
  const popupImg = document.getElementById("popup-img");
  const grid = document.getElementById("designGrid");

  // Wait for all images in the grid to load
  const imagePromises = Array.from(images).map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve); // avoid hang if image fails
      }
    });
  });

  Promise.all(imagePromises).then(() => {
    // All images loaded — trigger fade-in
    grid.classList.remove("hidden");
    grid.classList.add("fade-in");
  });

  // Clicking an image opens popup
  images.forEach(img => {
    img.addEventListener("click", () => {
      popupImg.src = img.src;
      popupOverlay.classList.add("show");
    });
  });

  // Click outside to close (with fade-out)
  popupOverlay.addEventListener("click", (e) => {
    if (e.target !== popupImg) {

      popupOverlay.classList.add("closing");
      popupImg.classList.add("closing");

      setTimeout(() => {
        popupOverlay.classList.remove("show", "closing");
        popupImg.classList.remove("closing");
      }, 250);
    }
  });

});
