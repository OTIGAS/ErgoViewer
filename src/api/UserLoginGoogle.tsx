import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { auth, provider } from '@/src/service/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import img from '../assets/loading.gif';

import { Form, Button } from '@/src/styles/pages/test';

export const UserLoginGoogle = () => {
  const { user, setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((response) => {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        if(credential) console.log("Token: ", credential.accessToken);

        setUser(response.user);
        setMessage(`${response.user.displayName} autenticado.`);
      })
      .catch((error) => {
        console.log(error);
        setMessage('Falha na autenticação do usuário.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Image src={img} alt="Imagem de loading..." />}
      <h1>Authentication Google</h1>
      <label>{message}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
