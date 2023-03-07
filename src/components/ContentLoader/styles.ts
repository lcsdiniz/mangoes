import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 50px)'
  },
}));