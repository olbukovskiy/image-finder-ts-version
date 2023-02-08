import styled from '@emotion/styled';

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100% - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0 36px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
