import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')! as HTMLDivElement;

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLButtonElement>;
  }
}

export const Modal: React.FunctionComponent<{
  onClose: () => void;
  children?: React.ReactNode;
}> = function ({ onClose, children }) {
  useEffect(() => {
    const onEscHandler = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ): void => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscHandler);
    return () => window.removeEventListener('keydown', onEscHandler);
  }, [onClose]);

  const onBackdropClickHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClickHandler}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
