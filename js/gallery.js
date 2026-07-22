/* Gallery Lightbox & Filtering JS - Exclusively User Uploaded Ceremony Images */

document.addEventListener('DOMContentLoaded', () => {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.getElementById('closeLightbox');

  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const title = item.querySelector('.gallery-title')?.innerText || 'Utkarsha Ceremony';
      const tag = item.querySelector('.gallery-tag')?.innerText || 'Smt. Shakuntala Institutions';

      if (img && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxTitle.innerText = title;
        lightboxDesc.innerText = `${tag} • Smt. Shakuntala Institutions of Nursing Education, Hubli.`;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }
});
