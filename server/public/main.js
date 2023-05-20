const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

// Toggle the active class on the hamburger menu and mobile menu
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

const closeNavMenuOutside = (event) => {
  if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
    hamburgerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
}

document.addEventListener('click', closeNavMenuOutside);

