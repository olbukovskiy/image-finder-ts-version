import React from 'react';
import { LoadMoreButton } from './Button.styled';

export const LoadMoreBtn: React.FunctionComponent<{ onClick: () => void }> =
  function ({ onClick }) {
    return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
  };
