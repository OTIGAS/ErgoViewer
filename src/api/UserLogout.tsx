import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';

import { signOut } from 'firebase/auth';
import { auth } from '@/src/service/firebase';

import img from '../assets/loading.gif';

import { Button, Form } from '@/src/styles/pages/test';

export const UserLogout = () => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  function handleSubmit(event: any) {
    event.preventDefault();
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

    console.log('Context User: ', user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Image src={img} alt="Imagem de loading..." />}
      <h1>User Logout</h1>
      <label>{message}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
