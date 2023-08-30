import { useRouter } from 'next/router';
import Image from 'next/image';

import { useState } from 'react';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/src/service/firebase';

import img from '@/src/assets/loading.gif';

import { Div, Form, Input, Button, Label } from '@/src/styles/pages/test';

export default function UserPasswordReset() {
  const [userEmail, setUserEmail] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    if (!userEmail) {
      setMessage('Informe o email.');
      setLoading(false);
      return;
    }

    sendPasswordResetEmail(auth, userEmail)
      .then((response) => {
        console.log(response);
        setMessage('E-mail para redefinição de senha enviado com sucesso.');

        router.replace('../user');
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
  }

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        {loading && <Image src={img} alt="Imagem de loading..." />}
        <h1>Password Reset</h1>
        <Input
          placeholder="Email"
          type="email"
          value={userEmail}
          onChange={({ target }) => setUserEmail(target.value)}
        />

        <Button type='submit'>Enviar</Button>
        <Button type='button' onClick={() => router.replace('../user/login')}>Voltar</Button>

        <Label>{message}</Label>
      </Form>
    </Div>
  );
};
