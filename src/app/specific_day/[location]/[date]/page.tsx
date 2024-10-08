'use client';

import Layout from '@/components/Layout';
import styles from './page.module.scss';
import { formatDate } from '@/lib/format';
import { useSpecificDayWeather } from '@/hooks';
import SpecificDayWeatherDisplay from '@/components/features/SpecificDayWeatherDisplay';
import LocationSearchBar from '@/components/features/LocationSearchBar';
import { useRouter } from 'next/navigation';

type SpecificDayWeatherProps = { params: { location: string; date: string } };

export default function SpecificDayWeather({ params }: SpecificDayWeatherProps) {
  const { weather, isLoading, error } = useSpecificDayWeather(params.location, params.date);
  const formattedDate = formatDate(params.date);
  const router = useRouter();
  const onSearch = (query: string) => {
    router.push(`/specific_day/${query}/${params.date}`);
  };

  return (
    <Layout title={formattedDate}>
      <LocationSearchBar
        onSearch={onSearch}
        className={styles.searchBar}
        placeholder="地名で検索"
      />
      {isLoading && <p className={styles.message}>天気情報を読み込み中...</p>}
      {error && <p className={styles.message}>エラーが発生しました。もう一度お試しください。</p>}
      {weather && <SpecificDayWeatherDisplay weather={weather} />}
    </Layout>
  );
}
