import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '../context/UserContext';

import { auth } from '@/src/service/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import img from '../assets/loading.gif';

import { Input, Button, Form } from '@/src/styles/pages/test';

export const UserCreate = () => {
  const { setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((response) => {
        setUser(response.user);
        setMessage('Usuário criado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        setMessage('Falha ao criar um novo usuário.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Image src={img} alt="Imagem de loading..." />}
      <h1>Create account</h1>
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
