import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import { ForecastDay } from '@/types/weather';

type DayForecastCardProps = {
  location: string;
  day: ForecastDay;
  testId?: string;
};

const DayForecastCard = ({ location, day, testId }: DayForecastCardProps) => {
  return (
    <Link
      href={`/specific_day/${location}/${day.date}`}
      className={styles.dayForecast}
      role="link"
      data-testid={testId}
    >
      <div className={styles.date}>
        {new Date(day.date).toLocaleDateString('ja-JP', {
          weekday: 'short',
          month: 'numeric',
          day: 'numeric',
        })}
      </div>
      <Image
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
        width={64}
        height={64}
        className={styles.weatherIcon}
      />
      <div className={styles.temperature}>
        <span className={styles.maxTemp}>{Math.round(day.day.maxtemp_c)}°</span>
        <span className={styles.minTemp}>{Math.round(day.day.mintemp_c)}°</span>
      </div>
      <div className={styles.condition}>{day.day.condition.text}</div>
    </Link>
  );
};

export default DayForecastCard;
