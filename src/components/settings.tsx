import { ModalComponent } from './shared/modal';
import styled from 'styled-components';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useSettingsContext } from '../contexts/setting-context';
import { useSettingsStore } from '../store/settings';
import { useState } from 'react';

const Button = styled.button`
  background: transparent;
  border-radius: 4px;
  padding: 3px 15px;
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

const TIME_FORMAT_12H = '12h';
const TIME_FORMAT_24H = '24h';

export const Settings = () => {
  const { isOpen, toggle } = useSettingsContext();
  const { unit, time, setTime, setUnits } = useSettingsStore();
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [currentTime, setCurrentTime] = useState(time);
  const [curTime, setCurTime] = useState(useCurrentTime());

  const onSave = () => {
    setTime(currentTime);
    setUnits(currentUnit);
    toggle();
  };

  const onCancel = () => {
    setCurrentUnit(unit);
    setCurrentTime(time);
    setCurTime(
      new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: time === '12h',
      }),
    );

    toggle();
  };

  const updateTimeFormat = (format) => {
    setCurrentTime(format);
    setCurTime(
      new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: format === TIME_FORMAT_12H,
      }),
    );
  };

  return (
    <ModalComponent isOpen={isOpen} toggle={toggle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h3>Settings</h3>
        <div>
          <p>Units</p>
          <div>
            <Button
              onClick={() => setCurrentUnit('imperial')}
              className={`${currentUnit === 'imperial' ? 'active' : ''}`}
            >
              Imperial
            </Button>
            <Button onClick={() => setCurrentUnit('metric')} className={`${currentUnit === 'metric' ? 'active' : ''}`}>
              Metric
            </Button>
            <Button
              onClick={() => setCurrentUnit('standard')}
              className={`${currentUnit === 'standard' ? 'active' : ''}`}
            >
              Standard
            </Button>
          </div>
        </div>
        <div>
          <p>Time</p>
          <div>
            <Button 
              onClick={() => updateTimeFormat(TIME_FORMAT_12H)}
              className={`${currentTime === TIME_FORMAT_12H ? 'active' : ''}`}
            >
              AM/PM
            </Button>
            <Button
              onClick={() => updateTimeFormat(TIME_FORMAT_24H)}
              className={`${currentTime === TIME_FORMAT_24H ? 'active' : ''}`}
            >
              24h
            </Button>
          </div>
        </div>
        <div
          style={{
            marginTop: '1rem',
          }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <p>{curTime}</p>
        </div>
      </div>
    </ModalComponent>
  );
};
