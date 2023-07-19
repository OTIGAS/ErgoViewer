import { UserContext } from '@/src/context/UserContext';
import { auth } from '@/src/service/firebase';
import { Input, Button, Form } from '@/src/styles/pages/test';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';

export const UserLogin = () => {
  const { setUser } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();

    const response = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    if (response.user) {
      setUser(response.user);
      alert('Usuário Logado com Sucesso!');
    } else {
      alert('Falha no Login do Usuário');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button>Enviar</Button>
    </Form>
  );
};
