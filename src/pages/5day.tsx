import { useFiveDaysForecast } from "../hooks/useFiveDaysForecast";
import { useCityStore } from "../store/city";

export const FiveDay = () => {
  const city = useCityStore((state) => state.currentCity);
  const { status, error, data, isLoading } = useFiveDaysForecast();
  console.log(data);

  if (!city) {
    <div>
      <div>Pick a city to see full forecast</div>
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

  return (
    <div>
      <div>data</div>
    </div>
  );
};
