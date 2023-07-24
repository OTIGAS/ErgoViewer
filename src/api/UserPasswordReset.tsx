import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { auth } from '@/src/service/firebase';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import img from '../assets/loading.gif';

import { Form, Input, Button } from '@/src/styles/pages/test';

export const UserPasswordReset = () => {
  const { user, setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    if (!userEmail) {
      console.log('Informe o email.');
      setLoading(false);
      return;
    }

    sendPasswordResetEmail(auth, userEmail)
      .then((response) => {
        console.log(response);
        setMessage('E-mail para redefinição de senha enviado com sucesso.');
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          setMessage('E-mail não encontrado.');
        } else {
          setMessage('Falha na verificação deste e-mail.');
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
      <h1>User Password Reset</h1>
      <Input
        placeholder="Email"
        type="email"
        value={userEmail}
        onChange={({ target }) => setUserEmail(target.value)}
      />
      <label>{message}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
