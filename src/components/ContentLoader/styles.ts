import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 50px)',
  },
}));
