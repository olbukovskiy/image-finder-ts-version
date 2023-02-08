import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImagesItem } from '../../types';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery: React.FunctionComponent<{
  images: ImagesItem[];
}> = function ({ images }) {
  return (
    <ImageGalleryList>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ImageGalleryList>
  );
};
