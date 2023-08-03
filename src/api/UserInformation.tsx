import { useContext, useState } from 'react';

import { UserContext } from '@/src/context/UserContext';

import { Button, Form } from '@/src/styles/pages/test';

export const UserInformation = () => {
  const { user } = useContext(UserContext);

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Button>User Information</Button>
    </Form>
  );
};
