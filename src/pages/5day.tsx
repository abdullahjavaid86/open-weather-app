import { getShortDayFromTimeStamp } from '../utils/time';
import { useCityStore } from '../store/city';
import { useFiveDaysForecast } from '../hooks/useFiveDaysForecast';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { Loader } from '../components/shared/loader';
import styled from 'styled-components';
import { WeatherImage } from '../components/weather-icon';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FiveDay = () => {
  const city = useCityStore((state) => state.currentCity);
  const temperatureUnit = useTemperatureUnit();

  const { status, error, data, isLoading } = useFiveDaysForecast();

  if (!city) {
    return (
      <StyledDiv>
        <div>Pick a city to see full forecast</div>
      </StyledDiv>
    );
  }

  if (isLoading) {
    return (
      <StyledDiv>
        <Loader />
      </StyledDiv>
    );
  }

  if (status === 'error') {
    return (
      <StyledDiv>
        <div>{(error as { message: string }).message}</div>
      </StyledDiv>
    );
  }

  if (!data?.data) {
    return (
      <StyledDiv>
        <div>Please select another city</div>
      </StyledDiv>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <p>{data?.data?.city?.name}</p>
      <div
        style={{
          width: 'auto',
          overflowY: 'auto',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className="list"
          style={{
            display: 'flex',
            gap: '1rem',
            textAlign: 'center',
            width: 'max-content',
          }}
        >
          {data?.data?.list?.slice(0, 5).map((item) => {
            return (
              <div key={item.dt_txt}>
                <div>{getShortDayFromTimeStamp(item.dt_txt)}</div>
                <div>
                  <WeatherImage weather={item.weather[0]} />
                </div>
                <div>
                  <p>{item.weather[0].main}</p>
                  <div>
                    H: {item.main.temp_max}
                    {temperatureUnit} / L: {item.main.temp_min}
                    {temperatureUnit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
