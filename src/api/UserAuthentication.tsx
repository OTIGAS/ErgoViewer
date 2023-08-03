// import { useContext, useState } from 'react';

// import { auth } from '@/src/service/firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// import { UserContext } from '@/src/context/UserContext';

// import Image from 'next/image';
// import img from '../assets/loading.gif';

// import { Button, Form } from '@/src/styles/pages/test';

// export const UserAuthentication = () => {
//   const { user, setUser } = useContext(UserContext);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>('');

//   function handleSubmit(event: any) {
//     event.preventDefault();
//     setLoading(true);

//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser === null) {
//         setMessage('Nenhum usuário logado.');
//       } else if (currentUser) {
//         setMessage('Usuário encontrado.');
//         setUser(currentUser);
//       }
//       setLoading(false);
//     });
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       {loading && <Image src={img} alt="Imagem de loading..." />}
//       <h1>Authentication status</h1>
//       <label>{message}</label>
//       <Button>Enviar</Button>
//     </Form>
//   );
// };
