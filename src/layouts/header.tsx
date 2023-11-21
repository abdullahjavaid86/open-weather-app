import { ChangeEvent, useState } from 'react';

import { ThemeChooser } from '../components/icons/theme-choose';
import { cities } from '../constants/cities';
import styled from 'styled-components';
import { useCityStore } from '../store/city';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useSettingsContext } from '../contexts/setting-context';
import { useThemeChooser } from '../contexts/theme-chooser';

const StyledHeaderDiv = styled.div`
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
    align-items: center;
  }
`;

const SimpleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 16px;
`;

export const Header = () => {
  const { toggle } = useThemeChooser();
  const { toggle: openCloseModal } = useSettingsContext();
  const [search, setSearch] = useState(false);
  const time = useCurrentTime();
  const setCity = useCityStore((state) => state.setCity);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 3) {
      return;
    }
    const city = cities.find((item) => item.name === value);

    if (city) {
      setCity(city);
    }
  };

  const onFocus = () => {
    setSearch(true);
  };
  return (
    <header>
      <StyledHeaderDiv>
        <div>{time}</div>
        <div>
          <ul className="settings">
            <li onFocus={onFocus} onMouseOver={onFocus}>
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
                'search'
              )}
            </li>
            <li>
              <SimpleButton type="button" onClick={openCloseModal}>
                settings
              </SimpleButton>
            </li>
            <li onClick={toggle}>
              <ThemeChooser />
            </li>
          </ul>
        </div>
      </StyledHeaderDiv>
    </header>
  );
};
