import { useRouter } from 'next/router';
import Image from 'next/image';

import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/src/service/firebase';

import img from '@/src/assets/loading.gif';

import { Div, Form, Input, Button, Label } from '@/src/styles/pages/test';

export default function UserLogin() {
  const { user, setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

  async function signInDefault() {
    setLoading(true);

    if (!userEmail || !userPassword) {
      setMessage('Preencha seu E-mail ou/e Senha!');
      setLoading(false);
      return;
    }

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
  }

  async function signInGoogle() {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((response) => {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        if(credential) console.log("Token: ", credential.accessToken);

        setUser(response.user);
        setMessage(`${response.user.displayName} autenticado.`);

        router.replace('/user/home');
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
    <Div>
      <Form>
        {loading && <Image src={img} alt="Imagem de loading..." />}
        <h1>Login</h1>
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
        
        <Button type='button' onClick={() => signInDefault()}>Entrar</Button>
        <Button type='button' onClick={() => signInGoogle()}>Entrar com Google</Button>
        <Button type='button' onClick={() => router.replace('../user/create-account')}>Criar uma Conta</Button>
        <Button type='button' onClick={() => router.replace('../user/password-reset')}>Esqueci minha senha</Button>
                
        <Label>{message}</Label>
      </Form>
    </Div>
  );
};
