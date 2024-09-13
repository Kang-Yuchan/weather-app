import classNames from 'classnames';
import styles from './index.module.scss';

type DetailItemProps = {
  datail: {
    label: string;
    value: string | number;
    unit?: string;
  };
  className?: string;
};

const DetailItem = ({ datail: { label, value, unit = '' }, className }: DetailItemProps) => (
  <div className={classNames(styles.detailItem, className)}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>
      {value}
      <span>{unit}</span>
    </span>
  </div>
);

export default DetailItem;
