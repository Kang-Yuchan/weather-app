import Link from 'next/link';
import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.link}>
        Weather App
      </Link>
    </header>
  );
};

export default Header;
