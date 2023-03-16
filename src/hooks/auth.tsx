import {
  getAuth,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { PropsWithChildren, ReactNode, createContext, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { User } from '../types/user';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
  value?: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({
  children,
  value = {
    email: '',
    accessToken: '',
  },
}: AuthProviderProps): React.ReactElement<PropsWithChildren> {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@mangoes-user')
      ? JSON.parse(localStorage.getItem('@mangoes-user')!)
      : null;

    if (!storedUser && value.email !== '') {
      return value;
    }

    return storedUser;
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  function signIn(email: string, password: string) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email
          ? userCredential.user.email
          : '';

        userCredential.user.getIdToken().then((token) => {
          const authUser = { email: userEmail, accessToken: token };
          setUser(authUser);
          localStorage.setItem('@mangoes-user', JSON.stringify(authUser));
        });
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
}

export default AuthProvider;
