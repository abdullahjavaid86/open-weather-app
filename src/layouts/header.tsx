import styled from "styled-components";
import { useThemeChooser } from "../contexts/theme-chooser";
import { userCurrentTime } from "../hooks/useCurrentTime";
import { useSettingsContext } from "../contexts/setting-context";
import { ChangeEvent, useState } from "react";
import { cities } from "../constants/cities";
import { useCityStore } from "../store/city";

export const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  .settings {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
`;

export const Header = () => {
  const { toggle } = useThemeChooser();
  const { toggle: openCloseModal } = useSettingsContext();
  const [search, setSearch] = useState(false);
  const time = userCurrentTime();
  const setCity = useCityStore((state) => state.setCity);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 3) {
      return;
    }
    const city = cities.find((item) => item.name === value);
    console.log(city);

    if (city) {
      setCity(city);
    }
  };

  return (
    <header>
      <StyledHeaderDiv>
        <div>{time}</div>
        <div>
          <ul className="settings">
            <li onMouseOver={() => setSearch(true)}>
              {search ? (
                <>
                  <input type="text" list="data" onChange={onSearch} />
                  <datalist id="data">
                    {cities.map((item) => (
                      <option value={item.name} key={item.id} />
                    ))}
                  </datalist>
                </>
              ) : (
                "search"
              )}
            </li>
            <li onClick={openCloseModal}>settings</li>
            <li>
              <button onClick={toggle}>Toggle Dark Mode</button>
            </li>
          </ul>
        </div>
      </StyledHeaderDiv>
    </header>
  );
};
