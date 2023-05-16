var hamburgerMenu = document.querySelector(".hamburger-menu");
var menuList = document.querySelector(".menu-list");
var mobileMenu = document.querySelector(".mobile-menu");

// Toggle the active class on the hamburger menu and mobile menu
hamburgerMenu.addEventListener("click", function() {
  hamburgerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});