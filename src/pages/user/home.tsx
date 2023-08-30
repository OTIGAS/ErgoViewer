import { useRouter } from 'next/router';

import Image from 'next/image';

import img from '@/src/assets/loading.gif';
import person from '@/src/assets/person.png';

import { useContext, useEffect, useState } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '@/src/service/firebase';

import { getDatabase, ref, set } from "firebase/database";

import { UserContext } from '@/src/context/UserContext';

import { Div, Form, Label, Input, Button } from '@/src/styles/pages/test';

export default function Home() {

  const { user, setUser } = useContext(UserContext);

  const [task, setTask] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const db = getDatabase();
  const router = useRouter();
  
  useEffect(() => {
    const starCountRef = ref(db, 'user/' + postId + '/starCount');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault();

    if(!task) {
      setMessage('Precheca o input');
      return;
    }
    
    if(user && task) {
      set(ref(db, 'users/' + user.uid), {
        task,
      });
    }
  }

  function logout() {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setMessage('Usuário deslogado com sucesso.');
        setUser(null);

        router.replace('../user');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (user) {
    return (
      <Div>
        <div>

          {loading && <Image src={img} alt="Imagem de loading..." />}

          <Button type='button' onClick={() => logout()}>Deslogar</Button>

          <img src={user.photoURL === null ? person.src : user.photoURL} alt="Foto Perfil" />

          <h1> {user.displayName}</h1>
          <h2>{user.email}</h2>

          <Form onSubmit={handleSubmit}>
            <Label>DataBase Realtime</Label>

            <Input 
              placeholder="Task"
              value={task}
              onChange={({ target }) => setTask(target.value)}
            />

            <Button>Enviar</Button>

            <Label>{message}</Label>
          </Form>
        </div>
      </Div>
    );
  }
}
