import React, { useState } from 'react';
import { SpecificDayResponse, ForecastDay, HourData } from '@/types/weather';
import styles from './index.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import DetailItem from '@/components/ui/DetailItem';
import HoulyItemCard from '@/components/features/HourlyDetailCard';

type SpecificDayWeatherDisplayProps = {
  weather: SpecificDayResponse;
};

const SpecificDayWeatherDisplay = ({ weather }: SpecificDayWeatherDisplayProps) => {
  const { location, forecast } = weather;
  const forecastDay: ForecastDay = forecast.forecastday[0];
  const { day, astro, hour } = forecastDay;
  const [selectedHour, setSelectedHour] = useState<HourData | null>(hour[0]);

  if (!weather || !weather.forecast || !weather.forecast.forecastday[0]) return null;

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return styles.scorching;
    if (temp >= 30) return styles.hot;
    if (temp >= 25) return styles.warm;
    if (temp >= 20) return styles.mild;
    if (temp >= 15) return styles.cool;
    if (temp >= 5) return styles.cold;
    return styles.freezing;
  };

  const dayDetails = [
    { label: '最高気温 (°C)', value: day.maxtemp_c },
    { label: '最低気温 (°C)', value: day.mintemp_c },
    { label: '平均気温 (°C)', value: day.avgtemp_c },
    { label: '最大風速 (km/h)', value: day.maxwind_kph },
    { label: '総降水量 (mm)', value: day.totalprecip_mm },
    { label: '降雪量 (cm)', value: day.totalsnow_cm },
    { label: '平均湿度', value: day.avghumidity, unit: '%' },
    { label: '降水確率', value: day.daily_chance_of_rain, unit: '%' },
    { label: '降雪確率', value: day.daily_chance_of_snow, unit: '%' },
    { label: '平均視界 (km)', value: day.avgvis_km },
    { label: '紫外線指数', value: day.uv },
  ];

  const astroDetails = [
    { label: '日の出', value: astro.sunrise },
    { label: '日の入り', value: astro.sunset },
    { label: '月の出', value: astro.moonrise },
    { label: '月の入り', value: astro.moonset },
    { label: '月相', value: astro.moon_phase },
    { label: '月の輝度', value: astro.moon_illumination, unit: '%' },
  ];

  const handleHourClick = (hourData: HourData) => {
    setSelectedHour(hourData);
  };

  return (
    <div className={classNames(styles.weatherDisplay, getTemperatureColor(day.avgtemp_c))}>
      <div className={styles.mainInfo}>
        <h2 className={styles.location}>
          {location.name}, {location.country}
        </h2>
        <div className={styles.temperature}>{day.avgtemp_c}°C</div>
        <div className={styles.condition}>
          <Image
            src={`https:${day.condition.icon}`}
            alt={day.condition.text}
            width={64}
            height={64}
            className={styles.weatherIcon}
          />
          <span>{day.condition.text}</span>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>1日の概要</h3>
      <div className={styles.details}>
        {dayDetails.map((detail, index) => (
          <DetailItem key={index} datail={detail} />
        ))}
      </div>

      <h3 className={styles.sectionTitle}>天文情報</h3>
      <div className={styles.details}>
        {astroDetails.map((detail, index) => (
          <DetailItem key={index} datail={detail} />
        ))}
      </div>

      <h3 className={styles.sectionTitle}>時間ごとの詳細</h3>
      <div className={styles.hourlyDetails}>
        {hour.map((h, index) => (
          <HoulyItemCard key={index} item={h} handleHourClick={handleHourClick} />
        ))}
      </div>

      {selectedHour && (
        <div className={styles.selectedHourDetailsWrapper}>
          <h4>選択時間の詳細: {selectedHour.time.split(' ')[1]}</h4>
          <div className={styles.details}>
            <DetailItem datail={{ label: '気温 (°C)', value: selectedHour.temp_c }} />
            <DetailItem datail={{ label: '体感温度 (°C)', value: selectedHour.feelslike_c }} />
            <DetailItem datail={{ label: '湿度', value: selectedHour.humidity, unit: '%' }} />
            <DetailItem datail={{ label: '風速 (km/h)', value: selectedHour.wind_kph }} />
            <DetailItem datail={{ label: '風向', value: selectedHour.wind_dir }} />
            <DetailItem datail={{ label: '降水量 (mm)', value: selectedHour.precip_mm }} />
            <DetailItem
              datail={{ label: '降水確率', value: selectedHour.chance_of_rain, unit: '%' }}
            />
            <DetailItem datail={{ label: '視界 (km)', value: selectedHour.vis_km }} />
            <DetailItem datail={{ label: '紫外線指数', value: selectedHour.uv }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificDayWeatherDisplay;
