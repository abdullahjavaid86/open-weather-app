import { convertNumberTimeStampInHoursAndMinutes } from '../utils/time';
import { getWeatherIconUrl } from '../utils/weather';
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
        <div>Loading...</div>
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
          {data?.data?.weather?.map((item) => (
            <img src={getWeatherIconUrl(item.icon)} alt={item.description} key={item.id} />
          ))}
          {data.data.weather[0].main}
        </div>
        <div>
          <p>
            <span>Temp: </span> {data?.data?.main?.temp}
            {temperatureUnit}
          </p>
          <p>
            <span>Feels like: </span> {data.data.main.feels_like}
            {temperatureUnit}
          </p>
          <p>
            <span>Humidity: </span> {data.data.main.humidity}
            {temperatureUnit}
          </p>
          <p>
            <span>Sunrise: </span>
            {convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunrise) ?? 'N/A'}
          </p>
          <p>
            <span>Sunset: </span>
            {convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunset) ?? 'N/A'}
          </p>
        </div>
      </StyledWeatherDataDiv>
    </div>
  );
};
