import styled from "styled-components";
import { useThemeChooser } from "../contexts/theme-chooser";
import { userCurrentTime } from "../hooks/useCurrentTime";

export const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  .settings {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
`;

export const Header = () => {
  const { toggle } = useThemeChooser();
  const time = userCurrentTime();
  return (
    <header>
      <StyledHeaderDiv>
        <div>{time}</div>
        <div>
          <ul className="settings">
            <li>search</li>
            <li>settings</li>
            <li>
              <button onClick={toggle}>Toggle Dark Mode</button>
            </li>
          </ul>
        </div>
      </StyledHeaderDiv>
    </header>
  );
};
