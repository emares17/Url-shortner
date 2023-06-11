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


const loadButton = document.querySelector('.load');
const urlSection = document.querySelector('.url-section');
const totalPages = parseInt(urlSection.dataset.totalPages);
let currentPage = parseInt(urlSection.dataset.currentPage);

console.log('Initial currentPage:', currentPage);
console.log('Initial totalPages:', totalPages);

loadButton.addEventListener('click', () => {

  fetch(`/load-more?p=${parseInt(currentPage) + 1}`)
    .then(res => res.json())
    .then(data => {
      console.log('Response data:', data);

      const newShortUrl = data.shortUrl;
      console.log('New Urls loaded:', newShortUrl);

      newShortUrl.forEach(shortUrl => {
        const urlContainer = document.createElement('div');
        urlContainer.classList.add('url-container');
        urlContainer.innerHTML = 
        `<span class="url"><a href="${shortUrl.url}">${shortUrl.url}</a></span>
         <div class="url-display">
           <span class="short-url"><a href="${shortUrl.url_shortid}">${shortUrl.url_shortid}</a></span>
           <button class="copy-button">Copy</button>
        </div>`;

        urlSection.appendChild(urlContainer);
      });

      currentPage = parseInt(currentPage) + 1; 

      if (currentPage >= totalPages) {
        loadButton.style.display = 'none';
      }
    })
    .catch(err => {
      console.error('Error loading more data:', err);
    });
});











// loadMoreButton.addEventListener('click', () => {
//   fetch(`/?page=${currentPage + 1}`)
//     .then(response => response.text())
//     .then(html => {
//       const parser = new DOMParser();
//       const newDocument = parser.parseFromString(html, 'text/html');

//       const newURLs = newDocument.querySelectorAll('.url-container');
//       newURLs.forEach(newURL => {
//         urlSection.appendChild(newURL);
//       });

//       currentPage += 1;

//       if (currentPage === totalPages) {
//         loadMoreButton.style.display = 'none';
//       }
//     })
//     .catch(error => {
//       console.error('Error loading more data:', error);
//     });
// });
