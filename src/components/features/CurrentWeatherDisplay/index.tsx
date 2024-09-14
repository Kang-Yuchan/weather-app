import { WeatherResponse } from '@/types/weather';
import styles from './index.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import DetailItem from '@/components/ui/DetailItem';

type CurrentWeatherDisplayProps = {
  weather: WeatherResponse;
};

const CurrentWeatherDisplay = ({ weather }: CurrentWeatherDisplayProps) => {
  if (!weather || !weather.current) return null;

  const { location, current } = weather;

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return styles.scorching;
    if (temp >= 30) return styles.hot;
    if (temp >= 25) return styles.warm;
    if (temp >= 20) return styles.mild;
    if (temp >= 15) return styles.cool;
    if (temp >= 5) return styles.cold;
    return styles.freezing;
  };

  const details = [
    { label: '気温 (°C)', value: current.temp_c },
    { label: '気温 (°F)', value: current.temp_f },
    { label: '体感温度 (°C)', value: current.feelslike_c },
    { label: '体感温度 (°F)', value: current.feelslike_f },
    { label: '熱指数 (°C)', value: current.heatindex_c },
    { label: '熱指数 (°F)', value: current.heatindex_f },
    { label: '風冷指数 (°C)', value: current.windchill_c },
    { label: '風冷指数 (°F)', value: current.windchill_f },
    { label: '露点 (°C)', value: current.dewpoint_c },
    { label: '露点 (°F)', value: current.dewpoint_f },
    { label: '湿度', value: current.humidity, unit: '%' },
    { label: '雲量', value: current.cloud, unit: '%' },
    { label: '風速 (km/h)', value: current.wind_kph },
    { label: '風速 (mph)', value: current.wind_mph },
    { label: '風向', value: current.wind_dir },
    { label: '風向 (度)', value: current.wind_degree, unit: '°' },
    { label: '気圧 (hPa)', value: current.pressure_mb },
    { label: '気圧 (in)', value: current.pressure_in },
    { label: '降水量 (mm)', value: current.precip_mm },
    { label: '降水量 (in)', value: current.precip_in },
    { label: '視界 (km)', value: current.vis_km },
    { label: '視界 (miles)', value: current.vis_miles },
    { label: '紫外線指数', value: current.uv },
    { label: '突風 (km/h)', value: current.gust_kph },
    { label: '突風 (mph)', value: current.gust_mph },
  ];

  return (
    <div
      className={classNames(styles.weatherDisplay, getTemperatureColor(current.temp_c))}
      data-testid="current-weather"
    >
      <div className={styles.mainInfo}>
        <h2 className={styles.location}>
          {location.name}, {location.country}
        </h2>
        <div className={styles.temperature}>{current.temp_c}°C</div>
        <div className={styles.condition}>
          <Image
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            width={64}
            height={64}
            className={styles.weatherIcon}
          />
          <span>{current.condition.text}</span>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <h3 className={styles.sectionTitle}>気象詳細</h3>
        <div className={styles.dayNightInfo}>{current.is_day ? '昼間' : '夜間'}</div>
      </div>
      <div className={styles.details}>
        {details.map((detail, index) => (
          <DetailItem key={index} datail={detail} />
        ))}
      </div>
      <div className={styles.updateTime}>
        最終更新: {new Date(current.last_updated).toLocaleString()}
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
