import { getShortDayFromTimeStamp } from '../utils/time';
import { getWeatherIconUrl } from '../utils/weather';
import { useCityStore } from '../store/city';
import { useFiveDaysForecast } from '../hooks/useFiveDaysForecast';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';

export const FiveDay = () => {
  const city = useCityStore((state) => state.currentCity);
  const temperatureUnit = useTemperatureUnit();

  const { status, error, data, isLoading } = useFiveDaysForecast();

  if (!city) {
    return (
      <div>
        <div>Pick a city to see full forecast</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div>
        <div>{(error as { message: string }).message}</div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div>
        <div>Please select another city</div>
      </div>
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
          width: '70%',
          overflowY: 'auto',
          margin: '0 auto',
        }}
      >
        <div
          className="list"
          style={{
            display: 'flex',
            gap: '5rem',
            textAlign: 'center',
            width: 'max-content',
          }}
        >
          {data?.data?.list?.map((item) => {
            return (
              <div key={item.dt_txt}>
                <div>{getShortDayFromTimeStamp(item.dt_txt)}</div>
                <div>
                  <img src={getWeatherIconUrl(item.weather[0].icon)} alt={item.weather[0].description} />
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
