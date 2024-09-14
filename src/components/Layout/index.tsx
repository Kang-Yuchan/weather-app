import { ReactNode } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type LayoutProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

const Layout = ({ title, className, children }: LayoutProps) => {
  return (
    <main className={classNames(styles.layout, className)}>
      <h1 className={styles.title} data-testid="page-title">
        {title}
      </h1>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Layout;
