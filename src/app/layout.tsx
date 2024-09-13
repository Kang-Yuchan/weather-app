import Header from '@/components/header';
import '@/styles/globals.scss';
import { Noto_Sans_JP } from 'next/font/google';

const noto_sans_jp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata = {
  title: 'Weather App',
  description: 'A simple weather application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={noto_sans_jp.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
