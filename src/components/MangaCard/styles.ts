import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: '196px',
    textDecoration: 'none',
    color: 'orange'
  },

  author: {
    fontSize: '14px'
  }
}));