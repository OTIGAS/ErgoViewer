import { auth } from '@/src/service/firebase';
import { Input, Button, Form } from '@/src/styles/pages/test';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

export const UserLogout = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const [validate, setValidade] = useState<string>('')

  async function handleSubmit(event: any) {
    event.preventDefault();

    const response = await signOut(auth);

    console.log(response)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>User Logout</h1>
      <label>{validate}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
