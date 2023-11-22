import { Loader } from '../components/shared/loader';
import { WeatherImage } from '../components/weather-icon';
import { convertNumberTimeStampInHoursAndMinutes } from '../utils/time';
import styled from 'styled-components';
import { useCityStore } from '../store/city';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';

const StyledWeatherDataDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  line-height: 6px;
  & p > span {
    font-weight: 700;
  }
`;

export const Home = () => {
  const city = useCityStore((state) => state.currentCity);
  const temperatureUnit = useTemperatureUnit();

  const { status, error, data, isLoading } = useCurrentWeather();

  if (!city) {
    return (
      <StyledWeatherDataDiv>
        <div>Pick a city to see current weather</div>
      </StyledWeatherDataDiv>
    );
  }

  if (isLoading) {
    return (
      <StyledWeatherDataDiv>
        <Loader />
      </StyledWeatherDataDiv>
    );
  }

  if (status === 'error') {
    return (
      <StyledWeatherDataDiv>
        <div>{(error as { message: string }).message}</div>
      </StyledWeatherDataDiv>
    );
  }

  if (!data?.data) {
    return (
      <StyledWeatherDataDiv>
        <div>Please select another city</div>
      </StyledWeatherDataDiv>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>{data?.data.name}</div>
      <StyledWeatherDataDiv>
        <div style={{ display: 'grid', textAlign: 'center' }}>
          {data?.data?.weather?.map((item) => <WeatherImage weather={item} key={item.id} />)}
          {data.data.weather[0].main}
        </div>
        <div>
          <p>
            <span>Temp: </span>
            <span data-testId="temprature">
              {data?.data?.main?.temp} {temperatureUnit}
            </span>
          </p>
          <p>
            <span>Feels like: </span>
            <span data-testId="feels-like">
              {data.data.main.feels_like} {temperatureUnit}
            </span>
          </p>
          <p>
            <span>Humidity: </span>
            <span data-testId="humidity">
              {data.data.main.humidity} {temperatureUnit}
            </span>
          </p>
          <p>
            <span>Sunrise: </span>
            <span data-testId="surise">{convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunrise) ?? 'N/A'}</span>
          </p>
          <p>
            <span>Sunset: </span>
            <span data-testId="sunset">{convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunset) ?? 'N/A'}</span>
          </p>
        </div>
      </StyledWeatherDataDiv>
    </div>
  );
};
