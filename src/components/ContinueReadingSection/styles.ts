import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
  section: {
    padding: '16px 64px',
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
}))