import styled from 'styled-components';

const StyledSvg = styled.svg`
  fill: ${({ theme }) => theme.text};
`;

export const ToggleChart = () => {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
      <path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7zm1 9h-24v2h24v-2z" />
    </StyledSvg>
  );
};
