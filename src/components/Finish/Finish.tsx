import { FinishContainer, FinishText, FinishIcon } from './Finish.styled';

export const Finish: React.FunctionComponent = function () {
  return (
    <FinishContainer>
      <FinishText>
        We're sorry, but you've reached the end of search results.
        <FinishIcon />
      </FinishText>
    </FinishContainer>
  );
};
