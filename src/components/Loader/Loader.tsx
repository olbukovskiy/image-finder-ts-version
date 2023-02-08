import { InfinitySpin } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader: React.FunctionComponent = function () {
  return (
    <LoaderContainer>
      <InfinitySpin width="200" color="#4fa94d" />
    </LoaderContainer>
  );
};
