import { galleryItems } from './gallery-items.js';
// Change code below this line

// Log the imported galleryItems array to verify its contents
console.log('galleryItems:', galleryItems);

// Selectăm containerul galeriei
const galleryContainer = document.querySelector('.gallery');
// Log the selected gallery container to ensure it's correctly selected
console.log('galleryContainer:', galleryContainer);

// Crearea markup-ului galeriei
const createGalleryMarkup = (items) => {
  return items
    .map((item) => {
      const { preview, original, description } = item;
      // Log each gallery item to see its properties
      console.log('Gallery Item:', item);
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join('');
};

// Randarea galeriei
const renderGallery = () => {
  // Create the markup and log it before rendering
  const markup = createGalleryMarkup(galleryItems);
  console.log('Generated Gallery Markup:', markup);
  galleryContainer.innerHTML = markup;
};

renderGallery();

let instance = null; // Declarația variabilei instanță la nivel global

// Gestionarea clicurilor în galerie
function onGalleryClick(e) {
  e.preventDefault();
  // Verificăm dacă elementul pe care s-a făcut clic este o imagine din galerie
  const isGalleryImg = e.target.classList.contains('gallery__image');
  // Log whether the clicked item is a gallery image
  console.log('Clicked element is gallery image:', isGalleryImg);
  if (!isGalleryImg) return;

  // Obținem sursa imaginii originale
  const imgSource = e.target.dataset.source;
  // Log the source of the image that will be displayed in the lightbox
  console.log('Image source for lightbox:', imgSource);

  // Cream o instanță basicLightbox cu imaginea originală
  instance = basicLightbox.create(`
    <img src="${imgSource}" width="800" height="600" />
  `);

  instance.show();

  // Adăugăm ascultător pentru evenimentul de apăsare a tastei Escape
  document.addEventListener('keydown', onEscKeyPress);
}

// Funcția pentru gestionarea închiderii cu tasta Escape
function onEscKeyPress(e) {
  // Log the key that was pressed
  console.log('Key pressed:', e.key);
  if (e.key === 'Escape' && instance) {
    instance.close();
    instance = null; // Resetăm instanța după închidere
    document.removeEventListener('keydown', onEscKeyPress); // Eliminăm ascultătorul
  }
}

// Adăugăm un listener de eveniment pentru clicuri pe containerul galeriei
galleryContainer.addEventListener('click', onGalleryClick);