import { ForecastResponse } from '@/types/weather';
import styles from './index.module.scss';
import DayForecastCard from '@/components/features/DayForecastCard';

type ForecastWeatherDisplayProps = {
  forecast: ForecastResponse;
};

const ForecastWeatherDisplay = ({ forecast }: ForecastWeatherDisplayProps) => {
  if (!forecast || !forecast.forecast) return null;

  return (
    <div className={styles.forecastDisplay}>
      <h2 className={styles.title}>7日間の天気予報</h2>
      <div className={styles.forecastGrid}>
        {forecast.forecast.forecastday.map((day) => (
          <DayForecastCard key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
};

export default ForecastWeatherDisplay;
