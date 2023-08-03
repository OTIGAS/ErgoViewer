import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../service/firebase';

interface UserContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
 

export function UserStorage({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth, 'O usuário está autenticado');
        setUser(userAuth);
      } else {
        console.log(userAuth, 'O usuário não está autenticado');
        setUser({});
      }
    });

    // // Retornar uma função de limpeza para desinscrever o observador quando o componente for desmontado.
    // return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
