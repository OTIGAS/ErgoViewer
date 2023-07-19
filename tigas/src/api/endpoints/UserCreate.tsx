import { auth } from '@/src/service/firebase';
import { Input, Button, Form } from '@/src/styles/pages/test';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const UserCreate = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    const user = userCredential.user;

    console.log('Response: ', userCredential);
    console.log('User: ', user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>User Create</h1>
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
