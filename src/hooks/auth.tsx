import {
  getAuth,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { PropsWithChildren, createContext, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { User } from '../types/user';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@mangoes-user')
      ? JSON.parse(localStorage.getItem('@mangoes-user')!)
      : null;

    return storedUser;
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  function signIn(email: string, password: string) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        localStorage.setItem(
          '@mangoes-user',
          JSON.stringify(userCredential.user)
        );
      })
      .catch((error) => {
        showNotification({
          title: 'Authentication Error',
          message: 'Incorrect email and/or password',
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  }

  function signOut() {
    firebaseSignOut(auth)
      .then(() => {
        localStorage.removeItem('@mangoes-user');
        setUser(null);
      })
      .catch((error) => {});
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
