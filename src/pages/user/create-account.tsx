import { useRouter } from 'next/router';
import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/service/firebase';

import img from '@/src/assets/loading.gif';

import { Div, Form, Input, Button, Label } from '@/src/styles/pages/test';

export default function UserCreate() {
  const { setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

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
    <Div>
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

        <Button type='submit'>Enviar</Button>
        <Button type='button' onClick={() => router.replace('../user/login')}>Voltar</Button>
        
        <Label>{message}</Label>
      </Form>
    </Div> 
  );
};
