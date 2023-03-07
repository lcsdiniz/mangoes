import { ApolloProvider } from '@apollo/client'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom'
import { client } from "./lib/apollo"

import Router from './routes/Router'
import { useState } from 'react'

import { initializeApp } from 'firebase/app';
import AuthProvider from './hooks/auth'
import { getFirestore } from 'firebase/firestore';
import ScrollToTop from './routes/ScrollToTop';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ 
              colorScheme,
              primaryColor: 'orange'
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider position='top-right'>
              <BrowserRouter>
                <ScrollToTop />
                <Router />
              </BrowserRouter>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
