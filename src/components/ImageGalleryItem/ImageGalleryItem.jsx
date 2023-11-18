import { useState } from 'react';
import { Item } from './imageGalleryItem.styled';
import { GalleryModal } from './Modal';

export const ImageGalleryItem = ({ imageUrl, tags, largeImgUrl }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = evt => {
    evt.stopPropagation();
    setModalOpen(false);
  };

  return (
    <Item onClick={openModal}>
      <img
        src={imageUrl}
        alt={tags}
        loading="lazy"
        width="350px"
        height="200px"
      ></img>
      <GalleryModal
        tags={tags}
        largeImgUrl={largeImgUrl}
        isOpen={isModalOpen}
        isClose={closeModal}
      />
    </Item>
  );
};
