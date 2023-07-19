import { UserContext } from '@/src/context/UserContext';
import { auth } from '@/src/service/firebase';
import { Button, Form } from '@/src/styles/pages/test';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useState } from 'react';

export const UserAuthentication = () => {
  const { user } = useContext(UserContext);

  const [validate, setValidade] = useState<string>('');

  async function handleSubmit(event: any) {
    event.preventDefault();

    console.log(user);

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
      });

      console.log('Resposta: ', unsubscribe);
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>User Authentication</h1>
      <label>{validate}</label>
      <Button>Enviar</Button>
    </Form>
  );
};
