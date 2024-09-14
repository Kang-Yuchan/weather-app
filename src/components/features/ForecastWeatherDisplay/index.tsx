import { ForecastResponse } from '@/types/weather';
import styles from './index.module.scss';
import DayForecastCard from '@/components/features/DayForecastCard';

type ForecastWeatherDisplayProps = {
  location: string;
  forecast: ForecastResponse;
};

const ForecastWeatherDisplay = ({ location, forecast }: ForecastWeatherDisplayProps) => {
  if (!forecast || !forecast.forecast) return null;

  return (
    <div className={styles.forecastDisplay} data-testid="forecast-weather">
      <h2 className={styles.title}>7日間の天気予報</h2>
      <div className={styles.forecastGrid}>
        {forecast.forecast.forecastday.map((day, index) => (
          <DayForecastCard
            key={day.date}
            location={location}
            day={day}
            testId={`forecast-day-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastWeatherDisplay;
