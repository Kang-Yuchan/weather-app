import { HourData } from '@/types/weather';
import styles from './index.module.scss';
import Image from 'next/image';

type HoulyItemCardProps = {
  item: HourData;
  handleHourClick: (item: HourData) => void;
};

const HoulyItemCard = ({ item, handleHourClick }: HoulyItemCardProps) => {
  return (
    <div className={styles.hourItem} onClick={() => handleHourClick(item)}>
      <span>{item.time.split(' ')[1]}</span>
      <Image
        src={`https:${item.condition.icon}`}
        alt={item.condition.text}
        width={32}
        height={32}
      />
      <span>{item.temp_c}°C</span>
    </div>
  );
};

export default HoulyItemCard;
