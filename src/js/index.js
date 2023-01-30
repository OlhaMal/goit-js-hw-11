import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.querySelector('.search-form__input'),
  searchBtn: document.querySelector('.search-form__button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  lightbox: new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  }),
};

refs.loadMoreBtn.style.display = 'none';

let pageNumber = 1;

function makeImagesList(images) {
  const imagesMarkup = images
    .map(image => {
      return `<a href="${image.largeImageURL}" class="photo-card__link">
      <div class="gallery__item"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
      <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${image.downloads}
          </p>
        </div>
      </div>
        </a>`;
    })
    .join('');

  refs.gallery.innerHTML += imagesMarkup;
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  pageNumber = 1;
  refs.loadMoreBtn.style.display = 'none';
}

refs.searchBtn.addEventListener('click', evt => {
  evt.preventDefault();
  clearGallery();
  const trimValue = refs.input.value.trim();
  if (trimValue !== '') {
    fetchImages(trimValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        makeImagesList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        refs.loadMoreBtn.style.display = 'block';
        refs.lightbox.refresh();
      }
    });
  }
});

refs.loadMoreBtn.addEventListener('click', () => {
 pageNumber += 1;
 const trimValue = refs.input.value.trim()
 refs.loadMoreBtn.style.display = 'none'
 fetchImages(trimValue, pageNumber).then(foundData => {
  if (foundData.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    makeImagesList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        refs.loadMoreBtn.style.display = 'block';
  }
 })
})

console.log(refs.loadMoreBtn)