import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    transition: 'all .3s ease-out',

    ['&:hover']: {
      transform: ' perspective(200px) translateZ(10px)',
      background: '#373A40'
    }
  },

  title: {
    fontWeight: 'bold',
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: '196px',
    textDecoration: 'none',
  },
}));