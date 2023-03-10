import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    transition: 'all .3s ease-out',

    '&:hover': {
      background: '#373A40',
    },
  },

  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '196px',
    textDecoration: 'none',
  },
}));
