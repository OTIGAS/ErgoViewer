import Image from 'next/image';

import img from '@/src/assets/loading.gif';

import { useContext, useState } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '@/src/service/firebase';

import { UserContext } from '@/src/context/UserContext';

import { Button, Div, Label } from '@/src/styles/pages/test';

export default function Home() {

  const { user, setUser } = useContext(UserContext);

  console.log(user)

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  function logout() {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setMessage('Usuário deslogado com sucesso.');
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
        setMessage('Falhar ao deslogar o usuário.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Div>
      <div>
        {loading && <Image src={img} alt="Imagem de loading..." />}
        <Button type='button' onClick={() => logout()}>Deslogar</Button>
        <img src={user.photoURL} alt="Foto Perfil" />
        <h1> {user.displayName}</h1>
        <h2>{user.email}</h2>
        <Label>{message}</Label>
      </div>
    </Div>
  );
}
