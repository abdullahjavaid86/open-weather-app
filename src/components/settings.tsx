import styled from "styled-components";
import { useSettingsContext } from "../contexts/setting-context";
import { ModalComponent } from "./shared/modal";
import { useSettingsStore } from "../store/settings";
import { useState } from "react";

const Button = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.text};
  margin: 0.2rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:hover,
  &.active {
    cursor: pointer;
    background: ${({ theme }) => theme.btnBackgroundColor};
    color: ${({ theme }) => theme.btnTextColor};
  }
`;

export const Settings = () => {
  const { isOpen, toggle } = useSettingsContext();
  const { unit, time, setTime, setUnits } = useSettingsStore();
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [currentTime, setCurrentTime] = useState(time);

  const onSave = () => {
    setTime(currentTime);
    setUnits(currentUnit);
    toggle();
  };

  const onCancel = () => {
    toggle();
  };
  return (
    <ModalComponent isOpen={isOpen} toggle={toggle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>Settings</h3>
        <div>
          <p>Units</p>
          <div>
            <Button
              onClick={() => setCurrentUnit("imperial")}
              className={`${currentUnit === "imperial" ? "active" : ""}`}
            >
              Imperial
            </Button>
            <Button
              onClick={() => setCurrentUnit("metric")}
              className={`${currentUnit === "metric" ? "active" : ""}`}
            >
              Metric
            </Button>
            <Button
              onClick={() => setCurrentUnit("standard")}
              className={`${currentUnit === "standard" ? "active" : ""}`}
            >
              Standard
            </Button>
          </div>
        </div>
        <div>
          <p>Time</p>
          <div>
            <Button
              onClick={() => setCurrentTime("12h")}
              className={`${currentTime === "12h" ? "active" : ""}`}
            >
              AM/PM
            </Button>
            <Button
              onClick={() => setCurrentTime("24h")}
              className={`${currentTime === "24h" ? "active" : ""}`}
            >
              24h
            </Button>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </ModalComponent>
  );
};
