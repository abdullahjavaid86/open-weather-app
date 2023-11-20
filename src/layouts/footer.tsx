import styled from "styled-components";
import { TCity } from "../constants/cities";
import { getRandomCities } from "../utils/get-random-cities";
import { useCityStore } from "../store/city";

export const Footer = () => {
  return (
    <footer>
      <div>
        {getRandomCities().map((item) => (
          <CityChooseButton key={item.id} city={item} />
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
  &:hover,
  &.active {
    cursor: pointer;
    background: ${({ theme }) => theme.btnBackgroundColor};
    color: ${({ theme }) => theme.btnTextColor};
  }
`;

const CityChooseButton = ({ city }: { city: TCity }) => {
  const { currentCity, setCity } = useCityStore((state) => state);
  return (
    <StyledWeatherButton
      onClick={() => setCity(city)}
      className={`${currentCity?.name === city.name ? "active" : ""}`}
    >
      {city.name}
    </StyledWeatherButton>
  );
};
