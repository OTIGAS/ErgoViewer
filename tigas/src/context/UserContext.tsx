import React, { createContext, useCallback, useState } from 'react';

interface UserContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export function UserStorage({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}