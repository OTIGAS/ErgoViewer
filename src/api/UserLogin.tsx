import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { auth } from '@/src/service/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import img from '../assets/loading.gif';

import { Form, Input, Button } from '@/src/styles/pages/test';

export const UserLogin = () => {
  const { user, setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((response) => {
        setUser(response.user);
        setMessage('Usuário logado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setMessage('Usuário não encontrado.');
        } else {
          setMessage('Falha no Login do Usuário');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    console.log('Context User: ', user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Image src={img} alt="Imagem de loading..." />}
      <h1>User Login</h1>
      <Input
        placeholder="Email"
        type="email"
        value={userEmail}
        onChange={({ target }) => setUserEmail(target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={userPassword}
        onChange={({ target }) => setUserPassword(target.value)}
      />
      <label>{message}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
