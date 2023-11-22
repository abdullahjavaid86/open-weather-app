import { TCity } from '../constants/cities';
import { getRandomCities } from '../utils/get-random-cities';
import styled from 'styled-components';
import { useCityStore } from '../store/city';
import { useMemo } from 'react';

export const Footer = () => {
  const cities = useMemo(() => getRandomCities(), []);
  return (
    <footer>
      <div>
        {cities.map((item, index) => (
          <CityChooseButton key={item.id} cityIndex={index} city={item} />
        ))}
      </div>
    </footer>
  );
};

const StyledWeatherButton = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  padding: 1rem;
  color: ${({ theme }) => theme.text};
  margin: 0.2rem;
  width: 16%;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:hover,
  &.active {
    cursor: pointer;
    background: ${({ theme }) => theme.btnBackgroundColor};
    color: ${({ theme }) => theme.hoverBtnTextColor};
  }
`;

const CityChooseButton = ({ city, cityIndex }: { city: TCity; cityIndex: number }) => {
  const { currentCity, setCity } = useCityStore((state) => state);

  return (
    <StyledWeatherButton
      data-testid={`city-${cityIndex}`}
      onClick={() => setCity(city)}
      className={`${currentCity?.name === city.name ? 'active' : ''}`}
    >
      {city.name}
    </StyledWeatherButton>
  );
};
