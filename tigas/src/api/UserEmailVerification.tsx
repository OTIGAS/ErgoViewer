import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { auth } from '@/src/service/firebase';
import { sendEmailVerification } from 'firebase/auth';

import img from '../assets/loading.gif';

import { Form, Input, Button } from '@/src/styles/pages/test';

export const UserEmailVerification = () => {
  const { user } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  auth.languageCode = 'pt-BR';
  const handleVerified = auth.currentUser;

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    if (handleVerified) {
      // IMPORTANTE
      // Quantidade maxima de teste por email é de 3, caso
      // contrario email será bloqueado para outros testes.
      sendEmailVerification(handleVerified)
        .then((response) => {
          console.log(response);
          setMessage('E-mail de verificação enviado com sucesso.');
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/too-many-requests') {
            setMessage('BLOQUEADO! Muitos pedidos de verificação.');
          } else {
            setMessage('Falha na verificação deste e-mail.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log(auth);
      setMessage('Nenhum usuário logado.');
    }

    console.log('Context User: ', user);
  }

  function handleClick() {
    console.log(handleVerified?.emailVerified);
    if (auth.currentUser?.emailVerified) {
      setVerifiedEmail(true);
      console.log('Email verificado.');
    } else {
      console.log('Email não verificado.');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Image src={img} alt="Imagem de loading..." />}
      <h1>User Send E-mail Verification</h1>
      <Input
        placeholder="Email"
        type="email"
        value={userEmail}
        onChange={({ target }) => setUserEmail(target.value)}
      />
      <label>{message}</label>
      <label onClick={handleClick}>
        {verifiedEmail === true
          ? 'E-mail verificado.'
          : 'E-mail não verificado.'}
      </label>
      <Button>Enviar</Button>
    </Form>
  );
};
