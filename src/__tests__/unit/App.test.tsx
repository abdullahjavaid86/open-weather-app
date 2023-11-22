import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeChooserProvider } from '../../contexts/theme-chooser';
import { cities } from '../../constants/cities';
import { getRandomCities } from '../../utils/get-random-cities';

export const queryClient = new QueryClient();

describe('App', () => {
  it('renders headline and clicks on a random city button in the footer', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeChooserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeChooserProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('settings')).toBeInTheDocument();

    const cityButtons = screen.getAllByRole('button', { name: /./ });

    const randomCities = getRandomCities();
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];

    const randomCityButton = cityButtons.find((button) => button.textContent === randomCity.name);

    expect(screen.getByText('Pick a city to see current weather')).toBeInTheDocument();

    if (randomCityButton) {
      fireEvent.click(randomCityButton);
      expect(screen.getByText(`${randomCityButton.textContent}`)).toBeInTheDocument();
    } else {
      console.error('Random city button not found.');
    }
  });

  it('renders headline and displays weather information', async () => {
    vi.mock('../../services/weather/weather', () => {
      return {
        getCurrentWeather: vi.fn(async () => ({
          isLoading: false,
          status: 'success',
          error: null,
          data: {
            base: 'stations',
            clouds: { all: 100 },
            cod: 200,
            coord: { lon: 6.1208, lat: 51.9525 },
            dt: 1700678499,
            id: 2755348,
            main: {
              temp: 278.36,
              feels_like: 277.55,
              temp_min: 278.13,
              humidity: 8,
              temp_max: 278.77,
              pressure: 1026,
            },
            name: 'Greffelkamp',
            sys: {
              type: 2,
              id: 2037908,
              country: 'NL',
              sunrise: 1700636790,
              sunset: 1700667415,
            },
            timezone: 3600,
            visibility: 10000,
            weather: [
              {
                id: 800,
                main: 'Clear',
              },
            ],
            wind: {
              speed: 1.34,
              deg: 232,
              gust: 2.24,
            },
          },
        })),
      };
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeChooserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeChooserProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('settings')).toBeInTheDocument();

    const cityButton = screen.getByTestId('city-0');

    const cityName = cityButton.textContent as string;

    expect(screen.getByText('Pick a city to see current weather')).toBeInTheDocument();

    if (cityName) {
      fireEvent.click(cityButton);

      await screen.findByText(cityName);

      screen.debug();
      const isCityExist = cities.find((city) => city.name === cityName);
      expect(isCityExist).toBeDefined();

      expect(screen.getByText('Clear')).toBeInTheDocument();

      const temprature = screen.getByTestId('temprature');

      expect(temprature.textContent as string).toBe('278.36 K');

      const feelsLike = screen.getByTestId('feels-like');
      expect(feelsLike.textContent as string).toBe('277.55 K');

      const humidity = screen.getByTestId('humidity');
      expect(humidity.textContent as string).toBe('8 K');

      expect(screen.getByText('Sunrise:')).toBeInTheDocument();
      expect(screen.getByText('Sunset:')).toBeInTheDocument();

      const surise = screen.getByTestId('surise');
      expect(surise.textContent as string).toBe('04:05');

      const sunset = screen.getByTestId('sunset');
      expect(sunset.textContent as string).toBe('17:09');
    } else {
      expect(screen.getByText('Pick a city to see current weather')).toBeInTheDocument();
      console.error('Random city button not found.');
    }
  });
});
