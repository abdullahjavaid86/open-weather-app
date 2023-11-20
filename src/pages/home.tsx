import styled from "styled-components";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import { useCityStore } from "../store/city";
import { convertNumberTimeStampInHoursAndMinutes } from "../utils/time";
import { getWeatherIconUrl } from "../utils/weather";

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

  const { status, error, data, isLoading } = useCurrentWeather();

  if (!city) {
    <div>
      <div>Pick a city to see current weather</div>
    </div>;
  }

  if (isLoading) {
    <div>
      <div>Loading...</div>
    </div>;
  }

  if (status === "error") {
    return (
      <div>
        <div>{(error as { message: string }).message}</div>
      </div>
    );
  }

  if (!data?.data) {
    <div>
      <div>Please select another city</div>
    </div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div>{data?.data.name}</div>
      <StyledWeatherDataDiv>
        <div style={{ display: "grid", textAlign: "center" }}>
          {data?.data?.weather?.map((item) => (
            <img src={getWeatherIconUrl(item.icon)} alt={item.description} />
          ))}
          {data?.data?.weather?.[0]?.main}
        </div>
        <div>
          <p>
            <span>Temp: </span> {data?.data?.main?.temp}
          </p>
          <p>
            <span>Feels like: </span> {data?.data?.main?.feels_like}
          </p>
          <p>
            <span>Humidity: </span> {data?.data?.main?.humidity}
          </p>
          <p>
            <span>Sunrise: </span>
            {data?.data?.sys?.sunrise
              ? convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunrise)
              : "N/A"}
          </p>
          <p>
            <span>Sunset: </span>
            {data?.data?.sys?.sunset
              ? convertNumberTimeStampInHoursAndMinutes(data.data.sys.sunset)
              : "N/A"}
          </p>
        </div>
      </StyledWeatherDataDiv>
    </div>
  );
};
