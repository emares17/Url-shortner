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

document.querySelectorAll('.copy-button').forEach(copyButton => {
  const shortUrlSpan = copyButton.parentNode.querySelector('.short-url');
  const shortUrlText = shortUrlSpan.textContent;
  let timeout;

  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(shortUrlText);

    copyButton.textContent = 'Copied!';
    copyButton.style.backgroundColor = 'hsl(257, 27%, 26%)';

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      copyButton.textContent = 'Copy';
      copyButton.style.backgroundColor = 'hsl(180, 66%, 49%)';
    }, 3000);

  });
});

