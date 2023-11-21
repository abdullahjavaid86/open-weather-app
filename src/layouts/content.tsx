import { Link, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';
import { Settings } from '../components/settings';
import { routePaths } from '../constants/paths';
import styled from 'styled-components';
import { useCityStore } from '../store/city';

const FullWidth = styled.div`
  height: 60vh;
`;

const SwitchForecast = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-weight: 700;
  a {
    border: 1px solid ${({ theme }) => theme.colors.blue};
    padding: 0.2rem 1.5rem;
    border-radius: 4px;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
  & a:hover,
  & a.active {
    cursor: pointer;
    background: ${({ theme }) => theme.btnBackgroundColor};
    color: ${({ theme }) => theme.btnTextColor};
  }
  & a:nth-child(even) {
    margin-right: 1rem;
  }
`;

export const Content = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isFiveDay = pathname === routePaths.FiveDay;
  const city = useCityStore((state) => state.currentCity);
  return (
    <FullWidth>
      <div>{children}</div>
      {city ? (
        <SwitchForecast>
          <p>Forecast</p>
          <Link to={routePaths.Home} className={`${isFiveDay ? '' : 'active'}`}>
            Now
          </Link>
          <Link to={routePaths.FiveDay} className={`${isFiveDay ? 'active' : ''}`}>
            5 Days
          </Link>
        </SwitchForecast>
      ) : null}
      <Settings />
    </FullWidth>
  );
};
