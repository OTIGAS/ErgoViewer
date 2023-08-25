import { useRouter } from 'next/router';

import { Div, Button } from '@/src/styles/pages/test';

export default function Home() {

  const router = useRouter();

  return (
    <Div>
      <Button type='button' onClick={() => router.replace('user/login')}>Entrar</Button>
      <Button type='button' onClick={() => router.replace('user/create-account')}>Criar uma Conta</Button>
    </Div>
  );
}