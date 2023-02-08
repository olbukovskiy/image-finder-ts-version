import { useState } from 'react';
import { ImagesItem } from '../../types';

import { Modal } from '../Modal/Modal';

import {
  ImageGalleryListItem,
  ImageGalleryImage,
  ImageLarge,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem: React.FunctionComponent<ImagesItem> = function ({
  id,
  tags,
  webformatURL,
  largeImageURL,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  return (
    <ImageGalleryListItem id={id}>
      <ImageGalleryImage onClick={openModal} src={webformatURL} alt={tags} />
      {modalOpen && (
        <Modal onClose={closeModal}>
          <ImageLarge src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageGalleryListItem>
  );
};
