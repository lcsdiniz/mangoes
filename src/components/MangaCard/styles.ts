import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    transition: 'all .3s ease-out',
    transform: '',

    '&:hover': {
      background: '#373A40',
      transform: 'scale(1.05)',
    },

    [`@media (max-width: 50em)`]: {
      padding: 8,
    },
  },

  title: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '196px',
    textDecoration: 'none',

    [`@media (max-width: 50em)`]: {
      maxWidth: '120px',
    },
  },

  author: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [`@media (max-width: 50em)`]: {
      maxWidth: '120px',
    },
  },
}));
