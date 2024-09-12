import styles from './index.module.scss';

type DetailItemProps = {
  datail: {
    label: string;
    value: string | number;
    unit?: string;
  };
};

const DetailItem = ({ datail: { label, value, unit = '' } }: DetailItemProps) => (
  <div className={styles.detailItem}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>
      {value}
      {unit}
    </span>
  </div>
);

export default DetailItem;
