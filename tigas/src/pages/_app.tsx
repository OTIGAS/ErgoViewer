import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import { UserStorage } from '../context/UserContext';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserStorage>
      <Component {...pageProps} />
    </UserStorage>
  );
}
