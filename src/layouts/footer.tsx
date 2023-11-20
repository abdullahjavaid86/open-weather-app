import { TCity } from "../constants/cities";
import { useCityChooser } from "../contexts/citiy-chooser";
import { getRandomCities } from "../utils/get-random-cities";

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

const CityChooseButton = ({ city }: { city: TCity }) => {
  const { setCity } = useCityChooser();
  return <button onClick={() => setCity(city)}>{city.name}</button>;
};
